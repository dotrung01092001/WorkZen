import { useState, createContext, useContext, useEffect, useMemo, useRef } from "react";
import { MOCK_TASKS } from "@/lib/mock-tasks";
import type {
  Task,
  TaskAttachment,
  TaskNotification,
  TaskTimelineEvent,
} from "@/types/task";
import type { TaskStatus } from "@/types/common";
import { useAuth } from "@/hooks/useAuth";

type TaskContextType = {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  addTaskAttachment: (taskId: string, attachment: Omit<TaskAttachment, "id" | "uploadedAt">) => void;
  removeTaskAttachment: (taskId: string, attachmentId: string) => void;
  addTimelineEvent: (taskId: string, action: string, details?: string) => void;
  notifications: TaskNotification[];
  unreadNotifications: number;
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
  isAdded: boolean;
  isOpenDialog: boolean;
  handleOpenDialog: (id: string) => void;
  handleCloseDialog2: () => void;
  handleConfirmDelete2: () => void;
  isUpdated: boolean;
  setIsUpdated: (value: boolean) => void;
};

const TaskContext = createContext<TaskContextType | null>(null);
const TASKS_STORAGE_KEY = "tasks";
const TASK_NOTIFICATIONS_STORAGE_KEY = "task_notification_reads";
const TASK_CHANNEL_NAME = "workzen_tasks_realtime";

function normalizeTask(task: Task): Task {
  return {
    ...task,
    updatedAt: task.updatedAt ?? task.createdAt,
    attachments: task.attachments ?? [],
    timeline: task.timeline ?? [],
  };
}

function diffInDays(dateIso: string) {
  const dueDate = new Date(dateIso);
  const now = new Date();
  const dueUtc = Date.UTC(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
  const nowUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.floor((dueUtc - nowUtc) / (1000 * 60 * 60 * 24));
}

function buildNotifications(tasks: Task[], readIds: string[]) {
  const readSet = new Set(readIds);
  const notifications: TaskNotification[] = [];

  tasks.forEach((task) => {
    if (task.status === "done") {
      return;
    }

    const dueDiff = diffInDays(task.dueDate);
    let level: TaskNotification["level"] | null = null;
    let title = "";
    let description = "";

    if (dueDiff < 0) {
      level = "critical";
      title = "Task overdue";
      description = `"${task.title}" is overdue by ${Math.abs(dueDiff)} day(s).`;
    } else if (dueDiff <= 2) {
      level = "warning";
      title = "Task due soon";
      description = `"${task.title}" is due in ${dueDiff} day(s).`;
    } else if (dueDiff <= 7) {
      level = "info";
      title = "Upcoming deadline";
      description = `"${task.title}" is due within this week.`;
    }

    if (!level) {
      return;
    }

    const id = `${task.id}-${level}-${task.dueDate}`;
    notifications.push({
      id,
      taskId: task.id,
      title,
      description,
      level,
      createdAt: new Date().toISOString(),
      read: readSet.has(id),
    });
  });

  return notifications.sort((a, b) => {
    const weight = { critical: 3, warning: 2, info: 1 };
    return weight[b.level] - weight[a.level];
  });
}

function fakeFetchTasks(): Promise<Task[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = localStorage.getItem(TASKS_STORAGE_KEY);
      if (stored) {
        resolve(JSON.parse(stored));
      } else {
        resolve(MOCK_TASKS);
      }
    }, 1000);
  });
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [readNotificationIds, setReadNotificationIds] = useState<string[]>(() => {
    const stored = localStorage.getItem(TASK_NOTIFICATIONS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const tabIdRef = useRef(crypto.randomUUID());
  const channelRef = useRef<BroadcastChannel | null>(null);
  const skipBroadcastRef = useRef(false);

  const actor = useMemo(
    () =>
      user
        ? { id: user.id, name: user.name }
        : { id: "system", name: "System" },
    [user],
  );
  const notifications = useMemo(
    () => buildNotifications(tasks, readNotificationIds),
    [readNotificationIds, tasks],
  );

  const appendTimeline = (
    currentTask: Task,
    action: string,
    details?: string,
  ): TaskTimelineEvent[] => {
    const existing = currentTask.timeline ?? [];
    const event: TaskTimelineEvent = {
      id: crypto.randomUUID(),
      taskId: currentTask.id,
      actorId: actor.id,
      actorName: actor.name,
      action,
      details,
      createdAt: new Date().toISOString(),
    };

    return [event, ...existing].slice(0, 100);
  };

  useEffect(() => {
    fakeFetchTasks()
      .then((data) => {
        setTasks(data.map(normalizeTask));
      })
      .catch(() => {
        setError("Failed to load tasks");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));

      if (!skipBroadcastRef.current) {
        channelRef.current?.postMessage({
          source: tabIdRef.current,
          payload: tasks,
        });
      }

      skipBroadcastRef.current = false;
    }
  }, [tasks, isLoading]);

  useEffect(() => {
    localStorage.setItem(TASK_NOTIFICATIONS_STORAGE_KEY, JSON.stringify(readNotificationIds));
  }, [readNotificationIds]);

  useEffect(() => {
    if (typeof BroadcastChannel === "undefined") {
      return;
    }

    const channel = new BroadcastChannel(TASK_CHANNEL_NAME);
    channelRef.current = channel;
    channel.onmessage = (event) => {
      const message = event.data as { source: string; payload: Task[] };
      if (!message || message.source === tabIdRef.current) {
        return;
      }

      skipBroadcastRef.current = true;
      setTasks(message.payload.map(normalizeTask));
    };

    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, []);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === TASKS_STORAGE_KEY && event.newValue) {
        skipBroadcastRef.current = true;
        setTasks(JSON.parse(event.newValue).map(normalizeTask));
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addTask = (task: Task) => {
    const newTask = normalizeTask({
      ...task,
      createdAt: task.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    newTask.timeline = appendTimeline(newTask, "created task");

    setTasks((prev) => [...prev, newTask]);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  const handleOpenDialog = (id: string) => {
    setSelectedTask(id);
    setIsOpenDialog(true);
  };

  const handleCloseDialog2 = () => {
    setIsOpenDialog(false);
    setSelectedTask(null);
  };

  const handleConfirmDelete2 = () => {
    if (!selectedTask) return;

    setTasks((prev) => prev.filter((task) => task.id !== selectedTask));
    setReadNotificationIds((prev) =>
      prev.filter((notificationId) => !notificationId.startsWith(`${selectedTask}-`)),
    );
    handleCloseDialog2();
  };

  const updateTask = (task: Task) => {
    setTasks((prev) =>
      prev.map((currentTask) => {
        if (currentTask.id !== task.id) {
          return currentTask;
        }

        const merged: Task = normalizeTask({
          ...task,
          timeline: currentTask.timeline,
          attachments: task.attachments ?? currentTask.attachments,
          createdAt: currentTask.createdAt,
          updatedAt: new Date().toISOString(),
        });
        merged.timeline = appendTimeline(merged, "updated task", merged.title);
        return merged;
      }),
    );
  };

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id || task.status === status) {
          return task;
        }

        const updatedTask = {
          ...task,
          status,
          updatedAt: new Date().toISOString(),
        };
        updatedTask.timeline = appendTimeline(
          updatedTask,
          "changed status",
          `${task.status} -> ${status}`,
        );
        return updatedTask;
      }),
    );
  };

  const addTaskAttachment = (
    taskId: string,
    attachment: Omit<TaskAttachment, "id" | "uploadedAt">,
  ) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        const nextAttachment: TaskAttachment = {
          ...attachment,
          id: crypto.randomUUID(),
          uploadedAt: new Date().toISOString(),
        };
        const updatedTask = {
          ...task,
          updatedAt: new Date().toISOString(),
          attachments: [nextAttachment, ...(task.attachments ?? [])],
        };
        updatedTask.timeline = appendTimeline(
          updatedTask,
          "uploaded attachment",
          attachment.fileName,
        );
        return updatedTask;
      }),
    );
  };

  const removeTaskAttachment = (taskId: string, attachmentId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        const target = (task.attachments ?? []).find((item) => item.id === attachmentId);
        const updatedTask = {
          ...task,
          updatedAt: new Date().toISOString(),
          attachments: (task.attachments ?? []).filter((item) => item.id !== attachmentId),
        };
        updatedTask.timeline = appendTimeline(
          updatedTask,
          "removed attachment",
          target?.fileName ?? "attachment",
        );
        return updatedTask;
      }),
    );
  };

  const addTimelineEvent = (taskId: string, action: string, details?: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        const updatedTask = {
          ...task,
          updatedAt: new Date().toISOString(),
        };
        updatedTask.timeline = appendTimeline(updatedTask, action, details);
        return updatedTask;
      }),
    );
  };

  const markNotificationAsRead = (notificationId: string) => {
    setReadNotificationIds((prev) =>
      prev.includes(notificationId) ? prev : [...prev, notificationId],
    );
  };

  const markAllNotificationsRead = () => {
    setReadNotificationIds(notifications.map((item) => item.id));
  };

  const unreadNotifications = notifications.filter((item) => !item.read).length;

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        error,
        addTask,
        updateTask,
        updateTaskStatus,
        addTaskAttachment,
        removeTaskAttachment,
        addTimelineEvent,
        notifications,
        unreadNotifications,
        markNotificationAsRead,
        markAllNotificationsRead,
        isAdded,
        isOpenDialog,
        handleConfirmDelete2,
        handleCloseDialog2,
        handleOpenDialog,
        isUpdated,
        setIsUpdated,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTask() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTask must be used inside TaskProvider");
  return ctx;
}
