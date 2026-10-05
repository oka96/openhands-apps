import { mkdtemp, realpath, mkdir, writeFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { collect } from '../../src/collector.cjs';

export async function roleSpecsFixture(t) {
  const cwd = await realpath(await mkdtemp(path.join(os.tmpdir(), 'role-spec-store-')));
  t.after(() => rm(cwd, { recursive: true, force: true }));
  const root = path.join(cwd, 'openspec', 'changes');
  const roles = ['SA', 'Frontend', 'Backend', 'QA'], prefixes = ['SA', 'FE', 'BE', 'QA'];
  const metadata = { requirements: [{ id: 'REQ-001', title: 'Task labels', summary: 'Two frontend features',
    roles: Object.fromEntries(roles.map((role, index) => [role, { owner: `${role} owner`, note: '',
      specs: (role === 'Frontend' ? ['labels', 'filters'] : ['labels']).map(feature => ({
        id: `${prefixes[index]}-REQ-001-${feature}`, title: `${role} ${feature}`, state: 'backlog', note: '',
      })),
    }])),
  }] };
  const save = async () => {
    const requirement = metadata.requirements[0];
    for (const info of Object.values(requirement.roles)) for (const spec of info.specs) {
      await mkdir(path.join(root, spec.id), { recursive: true });
      await writeFile(path.join(root, spec.id, 'proposal.md'), `# Proposal for ${spec.id}\n\n## Kanban\n- Requirement title: ${requirement.title}\n- Requirement summary: ${requirement.summary}\n- Spec title: ${spec.title}\n- Owner: ${info.owner}\n- Role note: ${info.note}\n- State: ${spec.state}\n- Note: ${spec.note}\n`);
    }
  };
  for (const [role, info] of Object.entries(metadata.requirements[0].roles)) for (const spec of info.specs) {
    await mkdir(path.join(root, spec.id, 'specs', spec.id), { recursive: true });
    await writeFile(path.join(root, spec.id, 'design.md'), `# Design for ${spec.id}\n`);
    await writeFile(path.join(root, spec.id, 'specs', spec.id, 'spec.md'), `# ${spec.title}\n\nContract for ${spec.id}.\n`);
    await writeFile(path.join(root, spec.id, 'tasks.md'), `# Tasks\n\n- [${spec.id.endsWith('filters') ? ' ' : 'x'}] 1.1 [${role}] Verify ${spec.title}\n`);
  }
  const removeRole = async role => {
    for (const spec of metadata.requirements[0].roles[role].specs) await rm(path.join(root, spec.id), { recursive: true });
    metadata.requirements[0].roles[role].specs = [];
  };
  await save();
  return { cwd, root, metadata, save, removeRole, run: () => collect({ action: 'board' }, { cwd }) };
}

export async function addRepositoryScopes(fixture) {
  const apps = ['Frontend', 'Backend', 'QA'].map(role => ({ id: `sample-${role.toLowerCase()}`, name: `Meeting room ${role}`, role, repository: `https://github.com/example/sample-${role.toLowerCase()}.git` }));
  const entries = Object.entries(fixture.metadata.requirements[0].roles);
  const scopes = {};
  for (const [role, info] of entries) for (const spec of info.specs) {
    const references = role === 'SA' ? [] : entries.filter(([r]) => role === 'QA' ? ['SA', 'Frontend', 'Backend'].includes(r) : r === 'SA').flatMap(([, info]) => info.specs.map(s => s.id));
    scopes[spec.id] = { version: 1, applications: role === 'SA' ? apps : apps.filter(app => app.role === role), references };
    await writeFile(path.join(fixture.root, spec.id, 'scope.json'), JSON.stringify(scopes[spec.id]));
    await writeFile(path.join(fixture.root, spec.id, '.openspec.yaml'), `schema: ${role.toLowerCase()}\n`);
  }
  return scopes;
}
