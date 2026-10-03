import copy
import hashlib
import hmac
import importlib.util
import io
import json
from pathlib import Path
import tarfile
import tempfile
import unittest
from unittest import mock
import uuid

spec = importlib.util.spec_from_file_location('role_bridge', Path(__file__).resolve().parents[1] / 'src/automation_bridge.py')
bridge = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bridge)


def identity():
    return str(uuid.uuid4())


class BridgeTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.home = Path(self.temp.name).resolve()
        self.repository = self.home / 'automation'
        self.repository.mkdir()
        self.store = self.home / 'store'
        self.context = self.store / 'openspec/changes/current-change'
        self.context.mkdir(parents=True)
        self.config = {'workspace': str(self.home), 'spec_store': str(self.store), 'store_id': 'sample-store',
                       'skill_root': str(self.home), 'profile': 'saved-profile', 'timeout_seconds': 1800,
                       'canvas_url': 'http://127.0.0.1:8000'}
        (self.repository / 'role-workflow.json').write_text(json.dumps(self.config))
        self.metadata = {'version': 1, 'requirements': [{'id': 'REQ-001', 'change': 'current-change',
                         'roles': {role: {} for role in bridge.ROLES}}]}
        self.metadata_path = self.store / 'openspec/requirements.json'
        self.metadata_path.write_text(json.dumps(self.metadata))
        for role, stage in bridge.PAIRS:
            root = self.repository / 'automations' / f'openspec-{role.lower()}-{stage}'
            (root / 'tarball').mkdir(parents=True)
            definition = {'name': bridge.automation_name(role, stage), 'state': 'ACTIVE', 'enabled': True,
                          'trigger': bridge.trigger(role, stage), 'entrypoint': 'python3 run.py', 'timeout': 1800,
                          'keep_alive': False, 'tarball_source': {'type': 'internal'}}
            (root / 'automation.yaml').write_text(json.dumps(definition))
            (root / 'tarball/config.json').write_text(json.dumps({**self.config, 'mode': 'role', 'stage': stage, 'role': role}))
            (root / 'tarball/prompt.md').write_text('Use the existing OpenSpec skills.')
            (root / 'tarball/run.py').write_text('print("role runner fixture")\n')
        self.service = {'url_from_agent': 'http://127.0.0.1:18021', 'api_prefix': '/api/automation', 'auth_env_var': 'OPENHANDS_AUTOMATION_API_KEY'}
        self.automations, self.webhooks, self.events, self.calls, self.runs = [], [], [], [], []
        self.failure = None
        self.secret = None
        self.patch = mock.patch.object(bridge.Path, 'home', return_value=self.home)
        self.patch.start()
        self.addCleanup(self.patch.stop)
        self.client = self.new_client()

    def new_client(self, **overrides):
        return bridge.Bridge(overrides.get('service', self.service), overrides.get('home', str(self.home)),
                             env=overrides.get('env', {'OPENHANDS_AUTOMATION_API_KEY': 'session-secret'}),
                             requester=self.request, repository=self.repository)

    def request(self, url, *, method='GET', body=None, headers=None):
        self.calls.append((url, method, body, headers))
        route = url.split('/api/automation/v1', 1)[1]
        if '/events/' not in route:
            self.assertEqual(headers['X-Session-API-Key'], 'session-secret')
        if route == '?limit=100':
            return {'automations': copy.deepcopy(self.automations), 'total': len(self.automations)}
        if route == '/webhooks?limit=100':
            return {'webhooks': copy.deepcopy(self.webhooks), 'total': len(self.webhooks)}
        if route.startswith('/uploads?'):
            self.assertEqual(headers['Content-Type'], 'application/gzip')
            with tarfile.open(fileobj=io.BytesIO(body), mode='r:gz') as archive:
                self.assertEqual(archive.getnames(), list(bridge.BUNDLE_FILES))
                self.assertTrue(all(item.name[0] != '/' for item in archive.getmembers()))
            if self.failure == 'upload':
                raise bridge.BridgeError('lost upload response')
            return {'status': 'COMPLETED', 'tarball_path': 'oh-internal://uploads/' + identity()}
        if method == 'POST' and route == '':
            value = {'id': identity(), **copy.deepcopy(body)}
            value['trigger'].update(destination='dispatch_run', subject_key_expr=None, turn_text_expr=None, wake_agent=True)
            self.automations.append(value)
            if self.failure == 'create':
                self.failure = None
                raise bridge.BridgeError('lost creation response')
            return copy.deepcopy(value)
        if method == 'DELETE':
            self.automations = [row for row in self.automations if route != '/' + row['id']]
            if self.failure == 'delete':
                self.failure = None
                raise bridge.BridgeError('lost deletion response')
            return None
        if method == 'PATCH':
            value = next(item for item in self.automations if route == '/' + item['id'])
            value.update(copy.deepcopy(body))
            return copy.deepcopy(value)
        if route == '/webhooks' and method == 'POST':
            self.secret = body['webhook_secret']
            value = {key: content for key, content in body.items() if key != 'webhook_secret'}
            value.update(id=identity(), org_id=identity(), enabled=True)
            self.webhooks.append(value)
            if self.failure == 'source':
                self.failure = None
                raise bridge.BridgeError('lost source response')
            return copy.deepcopy(value)
        if route.startswith('/events/'):
            event = json.loads(body)
            expected = 'sha256=' + hmac.new(self.secret.encode(), body, hashlib.sha256).hexdigest()
            self.assertEqual(headers, {'X-Signature-256': expected})
            self.assertEqual(event['schema'], bridge.SCHEMA)
            self.assertEqual(event['type'], event['stage'] + '.requested')
            self.assertEqual(event['approval'], event['stage'])
            self.assertNotIn('automation_id', event)
            self.events.append(event)
            auto = next(row for row in self.automations if row['name'] == bridge.automation_name(event['role'], event['stage']))
            run = {'id': identity(), 'automation_id': auto['id'], 'status': 'PENDING', 'conversation_id': None, 'error_detail': None}
            self.runs.append(run)
            if self.failure == 'event':
                raise bridge.BridgeError('lost event response')
            return {'received': True, 'matched': 1, 'runs_created': [run['id']]}
        if '/runs?limit=100&offset=' in route:
            offset = int(route.rsplit('=', 1)[1])
            auto_id = route.split('/')[1]
            rows = [run for run in self.runs if run['automation_id'] == auto_id]
            return {'runs': copy.deepcopy(rows[offset:offset + 100]), 'total': len(rows), 'status_counts': {status: sum(row['status'] == status for row in rows) for status in bridge.STATUSES}}
        raise AssertionError((route, method))

    def input(self, stage='update', role='SA'):
        row = next(item for item in self.automations if item['name'] == bridge.automation_name(role, stage))
        return {'automation_id': row['id'], 'request_id': identity(), 'stage': stage, 'spec_store': str(self.store),
                'requirement_id': 'REQ-001', 'context_change': 'current-change', 'role': role,
                'change': 'new-change' if stage == 'propose' else 'current-change', 'request': 'Explore 标签; $(never-run)'}

    def count(self, route, method):
        return sum(url.split('/api/automation/v1', 1)[1] == route and verb == method for url, verb, *_ in self.calls)

    def legacy_inventory(self):
        rows = []
        for number, stage in enumerate(('explore', 'propose', 'update', 'apply', 'verify', 'sync', 'archive'), 1):
            rows.append({'id': identity(), 'name': f'OpenSpec {number:02d} · {stage.title()}', 'enabled': True,
                         'trigger': {'source': 'openspec-dashboard' if stage == 'explore' else 'openspec-manual',
                                     'on': 'explore.requested' if stage == 'explore' else 'manual-only'}})
        rows.extend({'id': identity(), 'name': f'OpenSpec Role · {stage.title()}', 'enabled': True,
                     'trigger': {'source': bridge.SOURCE, 'on': stage + '.requested'}} for stage in bridge.STAGES)
        return rows

    def test_v1_connection_migrates_ten_definitions_preserving_source_and_history(self):
        self.client.setup()
        source = self.client.state()['source']
        old = self.legacy_inventory()
        unrelated = {'id': identity(), 'name': 'Personal report', 'enabled': True, 'trigger': {'source': 'other'}}
        self.automations = copy.deepcopy(old) + [unrelated]
        self.runs = [{'id': identity(), 'automation_id': row['id'], 'status': 'COMPLETED', 'conversation_id': identity()} for row in old]
        history = copy.deepcopy(self.runs)
        self.client.save({'version': 1, 'stages': {stage: {'state': 'ready'} for stage in bridge.STAGES}, 'source': source})
        before = len(self.calls)
        self.assertFalse(self.client.probe()['ready'])
        self.assertTrue(all(method == 'GET' for _, method, *_ in self.calls[before:]))
        self.assertTrue(self.client.setup()['ready'])
        self.assertEqual(len(self.automations), 13)
        self.assertIn(unrelated, self.automations)
        self.assertEqual(self.runs, history)
        self.assertEqual(self.client.state()['source'], source)
        self.assertEqual(self.client.state()['version'], 2)
        self.assertEqual(sum(method == 'DELETE' for _, method, *_ in self.calls), 10)

    def test_active_retired_work_and_unknown_subscriber_block_before_mutation(self):
        self.automations = self.legacy_inventory()
        for status in ('PENDING', 'RUNNING'):
            self.calls.clear()
            self.runs = [{'automation_id': self.automations[-1]['id'], 'status': status}]
            with self.assertRaisesRegex(bridge.BridgeError, 'pending or running'):
                self.client.setup()
            self.assertTrue(all(method == 'GET' for _, method, *_ in self.calls))
        self.runs = []
        self.automations.append({'id': identity(), 'name': 'Unknown subscriber', 'enabled': True, 'trigger': {'source': bridge.SOURCE}})
        self.calls.clear()
        with self.assertRaisesRegex(bridge.BridgeError, 'Another enabled'):
            self.client.setup()
        self.assertTrue(all(method == 'GET' for _, method, *_ in self.calls))

    def test_lost_retirement_response_resumes_from_inventory(self):
        old = self.legacy_inventory()
        self.automations = copy.deepcopy(old)
        self.failure = 'delete'
        with self.assertRaisesRegex(bridge.BridgeError, 'lost deletion'):
            self.client.setup()
        self.assertEqual(len(self.automations), 9)
        self.assertTrue(self.client.setup()['ready'])
        self.assertEqual(sum(method == 'DELETE' for _, method, *_ in self.calls), 10)
        self.assertEqual(len(self.automations), 12)

    def test_valid_role_cannot_use_another_roles_automation_id(self):
        self.client.setup()
        data = self.input('apply', 'SA')
        data['role'] = 'Backend'
        with self.assertRaisesRegex(bridge.BridgeError, 'Selected role automation'):
            self.client.dispatch(data)
        self.assertEqual(self.events, [])

    def test_http_delete_accepts_native_empty_204_response(self):
        response = mock.MagicMock()
        response.__enter__.return_value.read.return_value = b''
        with mock.patch.object(bridge.urllib.request, 'build_opener') as opener:
            opener.return_value.open.return_value = response
            self.assertIsNone(bridge.request_json('http://127.0.0.1/example', method='DELETE'))

    def test_probe_is_read_only_and_setup_installs_exact_twelve_and_retires_recognized_legacy(self):
        legacy = {'id': identity(), 'name': 'OpenSpec 01 · Explore', 'enabled': True, 'trigger': {'source': 'openspec-dashboard', 'on': 'explore.requested'}}
        self.automations.append(copy.deepcopy(legacy))
        probe = self.client.probe()
        self.assertFalse(probe['ready'])
        self.assertEqual(probe['automations'], [])
        self.assertFalse(self.client.root.exists())
        self.assertTrue(all(method == 'GET' for _, method, *_ in self.calls))
        setup = self.client.setup()
        self.assertTrue(setup['ready'])
        self.assertEqual(len(setup['automations']), 12)
        self.assertNotIn(legacy, self.automations)
        self.assertEqual(setup['configuration']['spec_store'], str(self.store))
        self.assertNotIn('session-secret', json.dumps(setup))
        self.assertNotIn(self.secret, json.dumps(setup))
        self.assertEqual((self.client.root / 'connection.json').stat().st_mode & 0o777, 0o600)
        self.assertEqual(self.client.root.stat().st_mode & 0o777, 0o700)
        self.assertTrue(self.client.probe()['ready'])
        self.client.setup()
        self.assertEqual(self.count('', 'POST'), 12)
        self.assertEqual(self.count('/webhooks', 'POST'), 1)

    def test_all_roles_and_skills_dispatch_exact_signed_per_run_inputs(self):
        self.client.setup()
        before = copy.deepcopy(self.automations)
        for role in bridge.ROLES:
            for stage in bridge.STAGES:
                data = self.input(stage, role)
                if stage == 'apply':
                    data['request'] = ''
                result = self.client.dispatch(data)
                self.assertEqual(result['automation_id'], data['automation_id'])
                self.assertEqual(self.client.dispatch(data), result)
                self.assertEqual(self.events[-1]['role'], role)
                self.assertEqual(self.events[-1]['request'], data['request'])
        self.assertEqual(len(self.events), 12)
        self.assertEqual(self.automations, before)

    def test_completed_propose_retry_survives_created_target_and_returns_same_run(self):
        self.client.setup()
        data = self.input('propose')
        result = self.client.dispatch(data)
        (self.store / 'openspec/changes/new-change').mkdir()
        self.assertEqual(self.client.dispatch(data), result)
        self.assertEqual(len(self.events), 1)

    def test_unknown_dispatch_and_reused_id_never_start_another_run(self):
        self.client.setup()
        data = self.input()
        self.failure = 'event'
        with self.assertRaises(bridge.BridgeError):
            self.client.dispatch(data)
        with self.assertRaisesRegex(bridge.BridgeError, 'may already'):
            self.client.dispatch(data)
        with self.assertRaisesRegex(bridge.BridgeError, 'different inputs'):
            self.client.dispatch({**data, 'role': 'QA'})
        self.assertEqual(len(self.events), 1)

    def test_partial_creation_recovers_known_tarball_without_duplicate_definition(self):
        self.failure = 'create'
        with self.assertRaises(bridge.BridgeError):
            self.client.setup()
        self.assertTrue(self.client.setup()['ready'])
        self.assertEqual(self.count('', 'POST'), 12)
        self.assertEqual(len(self.automations), 12)

    def test_unknown_source_registration_never_overwrites_or_registers_twice(self):
        self.failure = 'source'
        with self.assertRaises(bridge.BridgeError):
            self.client.setup()
        with self.assertRaisesRegex(bridge.BridgeError, 'secret'):
            self.client.setup()
        self.assertEqual(self.count('/webhooks', 'POST'), 1)

    def test_unknown_upload_is_not_repeated_automatically(self):
        self.failure = 'upload'
        with self.assertRaises(bridge.BridgeError):
            self.client.setup()
        with self.assertRaisesRegex(bridge.BridgeError, 'upload outcome'):
            self.client.setup()
        self.assertEqual(sum('/uploads?' in url for url, *_ in self.calls), 1)

    def test_updated_bundle_upserts_same_ids_and_preserves_source_secret(self):
        self.client.setup()
        ids = [item['id'] for item in self.automations]
        secret = self.secret
        prompt = self.repository / 'automations/openspec-sa-propose/tarball/prompt.md'
        prompt.write_text('Updated prompt')
        self.assertFalse(self.client.probe()['ready'])
        self.assertTrue(self.client.setup()['ready'])
        self.assertEqual([item['id'] for item in self.automations], ids)
        self.assertEqual(self.secret, secret)
        self.assertEqual(sum(method == 'PATCH' for _, method, *_ in self.calls), 1)

    def test_disabled_or_reconfigured_definition_is_not_dispatchable(self):
        self.client.setup()
        self.automations[1]['enabled'] = False
        self.assertFalse(self.client.probe()['ready'])
        with self.assertRaisesRegex(bridge.BridgeError, 'Connect or update'):
            self.client.dispatch(self.input())
        self.assertEqual(self.events, [])
        self.assertTrue(self.client.setup()['ready'])

    def test_duplicate_names_and_competing_routes_are_rejected_before_mutation(self):
        self.client.setup()
        duplicate = {**self.automations[0], 'id': identity()}
        self.automations.append(duplicate)
        with self.assertRaisesRegex(bridge.BridgeError, 'Duplicate'):
            self.client.probe()
        duplicate['name'] = 'Unexpected subscriber'
        with self.assertRaisesRegex(bridge.BridgeError, 'Another enabled'):
            self.client.dispatch(self.input())
        self.assertEqual(self.events, [])

    def test_nondefault_native_trigger_routes_and_extra_keys_cannot_dispatch(self):
        self.client.setup()
        current = copy.deepcopy(self.automations[1]['trigger'])
        for update in ({'destination': 'deliver_to_conversation'}, {'subject_key_expr': 'workspace'},
                       {'turn_text_expr': 'request'}, {'wake_agent': False}, {'unexpected': 'value'}):
            self.automations[1]['trigger'] = {**current, **update}
            with self.subTest(update=update), self.assertRaisesRegex(bridge.BridgeError, 'Connect or update'):
                self.client.dispatch(self.input())
        self.assertEqual(self.events, [])

    def test_inputs_cannot_override_role_stage_store_or_requirement_mapping(self):
        self.client.setup()
        for change in ({'role': 'Admin'}, {'stage': 'archive'}, {'request': ''}, {'request': 'x' * 10001},
                       {'spec_store': str(self.home)}, {'change': '../escape'}, {'context_change': 'other-change'},
                       {'requirement_id': 'REQ-999'}, {'automation_id': identity()}, {'profile': 'other'},
                       {'request_id': '../escape'}, {'change': 'different-change'}):
            with self.subTest(change=change), self.assertRaises(bridge.BridgeError):
                self.client.dispatch({**self.input(), **change})
        self.assertFalse(self.events)

    def test_propose_refuses_existing_change_and_metadata_duplicates(self):
        self.client.setup()
        (self.store / 'openspec/changes/new-change').mkdir()
        with self.assertRaisesRegex(bridge.BridgeError, 'overwrite'):
            self.client.dispatch(self.input('propose'))
        self.metadata['requirements'].append(copy.deepcopy(self.metadata['requirements'][0]))
        self.metadata_path.write_text(json.dumps(self.metadata))
        with self.assertRaisesRegex(bridge.BridgeError, 'Duplicate store'):
            self.client.dispatch(self.input())

    def test_symlinked_metadata_and_tampered_generated_bundle_are_rejected(self):
        original = self.home / 'metadata.json'
        self.metadata_path.rename(original)
        self.metadata_path.symlink_to(original)
        self.client.setup()
        with self.assertRaisesRegex(bridge.BridgeError, 'symlinked'):
            self.client.dispatch(self.input())
        generated = self.repository / 'automations/openspec-sa-propose/tarball/config.json'
        generated.write_text(json.dumps({**self.config, 'mode': 'role', 'stage': 'apply'}))
        with self.assertRaisesRegex(bridge.BridgeError, 'stale'):
            self.client.probe()

    def test_service_home_and_config_validation_fail_closed(self):
        for change in ({'url_from_agent': 'https://example.com'}, {'url_from_agent': 'http://user:secret@localhost'},
                       {'url_from_agent': 'http://127.0.0.1:bad'}, {'api_prefix': '/other'}, {'auth_env_var': 'SECRET'}):
            with self.subTest(change=change), self.assertRaises(bridge.BridgeError):
                self.new_client(service={**self.service, **change})
        with self.assertRaises(bridge.BridgeError):
            self.new_client(home=str(self.repository))
        with self.assertRaises(bridge.BridgeError):
            self.new_client(env={})
        for value in ('/tmp/../store', '/tmp/.local/store', '/tmp/./store', '/tmp/a\npath', '/tmp/a\\path'):
            with self.subTest(value=value), self.assertRaises(bridge.BridgeError):
                bridge.local_path(value)
        (self.repository / 'role-workflow.json').write_text(json.dumps({**self.config, 'canvas_url': 'https://example.com'}))
        with self.assertRaises(bridge.BridgeError):
            self.new_client()

    def test_status_reports_native_pair_and_sanitizes_errors_and_metadata(self):
        self.client.setup()
        result = self.client.dispatch(self.input())
        target = {'automation_id': result['automation_id'], 'run_id': result['run_id']}
        for status in bridge.STATUSES:
            self.runs[0].update(status=status, error_detail='private-api-key', run_metadata={'secret': 'private-token'})
            value = self.client.status(target)
            self.assertEqual(value['status'], status)
            self.assertNotIn('private-', json.dumps(value))
        self.runs[0]['conversation_id'] = identity()
        self.assertEqual(self.client.status(target)['conversation_id'], self.runs[0]['conversation_id'])
        self.runs[0]['status'] = 'MADE_UP'
        with self.assertRaises(bridge.BridgeError):
            self.client.status(target)
        with self.assertRaises(bridge.BridgeError):
            self.client.status({**target, 'automation_id': self.automations[0]['id']})

    def test_status_paginates_and_missing_run_is_explicit(self):
        self.client.setup()
        result = self.client.dispatch(self.input())
        target = {'automation_id': result['automation_id'], 'run_id': result['run_id']}
        self.runs = [{**self.runs[0], 'id': identity()} for _ in range(100)] + self.runs
        self.assertEqual(self.client.status(target)['run_id'], target['run_id'])
        with self.assertRaisesRegex(bridge.BridgeError, 'not found'):
            self.client.status({**target, 'run_id': identity()})


if __name__ == '__main__':
    unittest.main()
