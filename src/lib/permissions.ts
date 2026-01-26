export type Role = 'admin' | 'staff';

export const permissions = {
  admin: ['view_employees', 'edit_employees', 'view_tasks'],
  staff: ['view_tasks'],
};

export function hasPermission(
  role: Role,
  permission: string
): boolean {
  return permissions[role]?.includes(permission) ?? false;
}
