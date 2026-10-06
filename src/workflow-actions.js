// Generated from openhands-automation/runtime/actions.json; presentation metadata only.
export const ACTIONS = Object.freeze([
  {
    "id": "propose",
    "label": "Propose",
    "kind": "agent",
    "skill": "openspec-propose",
    "description": "Create a role specification from your requirement and prompt."
  },
  {
    "id": "update",
    "label": "Update",
    "kind": "agent",
    "skill": "openspec-update-change",
    "description": "Revise the selected specification and save its before-and-after diff."
  },
  {
    "id": "apply",
    "label": "Apply",
    "kind": "agent",
    "skill": "openspec-apply-change",
    "description": "Implement the selected spec tasks. SA prepares its design handoff. Validation stays local."
  }
]);
export const STAGES = ACTIONS.map(action => action.id);
