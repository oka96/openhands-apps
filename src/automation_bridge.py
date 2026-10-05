"""Transport entrypoint only. Workflow behavior belongs to Automation."""
import json
from pathlib import Path
import runpy
import sys

runtime = Path('/Users/oka/Desktop/openhands-automation/runtime/control.py')
if not runtime.is_file() or runtime.resolve() != runtime:
    print(json.dumps({'version': 1, 'kind': 'error', 'message': 'Automation runtime is unavailable. Restore the configured openhands-automation checkout.'}))
    sys.exit(1)
runpy.run_path(str(runtime), run_name='__main__')
