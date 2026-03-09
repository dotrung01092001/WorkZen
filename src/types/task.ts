import { type ID, type Priority, type TaskStatus } from './common';

export interface TaskAttachment {
  id: ID;
  fileName: string;
  url: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
  uploadedBy: string;
}

export interface TaskTimelineEvent {
  id: ID;
  taskId: ID;
  actorId: string;
  actorName: string;
  action: string;
  details?: string;
  createdAt: string;
}

export interface TaskNotification {
  id: ID;
  taskId: ID;
  title: string;
  description: string;
  level: "info" | "warning" | "critical";
  createdAt: string;
  read: boolean;
}

export interface Task {
  id: ID;
  title: string;
  description?: string;
  assignee: string | null;
  status: TaskStatus;
  priority: Priority;
  dueDate: string; // ISO date
  createdAt: string;
  updatedAt?: string;
  attachments?: TaskAttachment[];
  timeline?: TaskTimelineEvent[];
}

export interface CreateTaskPayload {
  id: ID;
  title: string;
  description?: string;
  assignee: string | null;
  priority: Priority;
  dueDate: string;
}
