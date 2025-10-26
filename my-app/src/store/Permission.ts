type actions = "Delete" | "Edit" | "Select" | "Drag" | "Size";
const PermissionList = new Map<actions, boolean>();

function addPermissionFlag(payload: actions, value: boolean) {
  if (PermissionList.has(payload)) return;
  PermissionList.set(payload, value);
}

function getPermission(payload: actions): boolean | undefined {
  return PermissionList.get(payload);
}

function setPermission(payload: actions, value: boolean) {
  PermissionList.set(payload, value);
}

export { addPermissionFlag, getPermission, setPermission };
