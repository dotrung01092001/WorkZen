export const PERMISSIONS = {
  Admin: {
    settings: true,
    employees: true,
    task: 'ALL',
  },

  Manager: {
    settings: false,
    employees: true,
    task: 'ALL'
  },

  Employee: {
    settings: false,
    employees: false,
    task: 'OWN'
  }
} as const;

export type TaskPermission = 'ALL' | 'OWN';