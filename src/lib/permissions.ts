export const PERMISSIONS = {
  Admin: {
    settings: true,
    employees: true,
    task: 'ALL',
  },

  Manager: {
    settings: true,
    employees: true,
    task: 'ALL'
  },

  Employee: {
    settings: true,
    employees: false,
    task: 'OWN'
  }
} as const;

export type TaskPermission = 'ALL' | 'OWN';
