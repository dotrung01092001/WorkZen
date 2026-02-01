import { type Task } from '@/types/task';

export const MOCK_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Design dashboard layout',
    description: 'Create responsive admin layout',
    assignee: '2',
    status: 'in_progress',
    priority: 'High',
    dueDate: '2024-06-20',
    createdAt: '2024-06-01',
  },
  {
    id: 'task-2',
    title: 'Implement employee table',
    description: 'Create responsive admin layout',
    assignee: '2',
    status: 'todo',
    priority: 'Medium',
    dueDate: '2024-06-25',
    createdAt: '2024-06-03',
  },
];
