import { type ID, type Priority, type TaskStatus } from './common';

export interface Task {
  id: ID;
  title: string;
  description?: string;
  assignee: string | null;
  status: TaskStatus;
  priority: Priority;
  dueDate: string; // ISO date
  createdAt: string;
}

export interface CreateTaskPayload {
  id: ID;
  title: string;
  description?: string;
  assignee: string | null;
  priority: Priority;
  dueDate: string;
}
