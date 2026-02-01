export type ID = string;

export type Status = 'active' | 'inactive';

export type Role = 'Admin' | 'Manager' | 'Employee';

export type Priority = 'Low' | 'Medium' | 'High';

export type TaskStatus =
  | 'todo'
  | 'in_progress'
  | 'review'
  | 'done';

export type ThemeMode = 'light' | 'dark';
