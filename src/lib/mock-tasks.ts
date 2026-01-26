import { type Task } from '@/types/task';

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Design dashboard layout',
    description: 'Create responsive admin layout',
    assigneeId: 'emp-2',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2024-06-20',
    createdAt: '2024-06-01',
  },
  {
    id: 'task-2',
    title: 'Implement employee table',
    assigneeId: 'emp-3',
    status: 'todo',
    priority: 'medium',
    dueDate: '2024-06-25',
    createdAt: '2024-06-03',
  },
];
