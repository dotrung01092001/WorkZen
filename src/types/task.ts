import { type ID, type Priority, type TaskStatus } from './common';

export interface Task {
  id: ID;
  title: string;
  description?: string;
  assigneeId: ID;
  status: TaskStatus;
  priority: Priority;
  dueDate: string; // ISO date
  createdAt: string;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  assigneeId: ID;
  priority: Priority;
  dueDate: string;
}
