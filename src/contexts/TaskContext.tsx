import { useState, createContext, useContext, useEffect } from "react";

import { type Task } from "@/types/task";
import { MOCK_TASKS } from "@/lib/mock-tasks";
import type { TaskStatus } from "@/types/common";

type TaskContextType = {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  /* removeTask: (id: string) => void; */
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  isAdded: boolean;
  isOpenDialog: boolean;
  handleOpenDialog: (id: string) => void;
  handleCloseDialog2: () => void;
  handleConfirmDelete2: () => void;
  isUpdated: boolean;
  setIsUpdated: (value: boolean) => void
};

const TaskContext = createContext<TaskContextType | null>(null);

// 🔹 Fake API function
function fakeFetchTasks(): Promise<Task[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = localStorage.getItem("tasks");
      if (stored) {
        resolve(JSON.parse(stored));
      } else {
        resolve(MOCK_TASKS);
      }
    }, 1000); // giả lập network delay
  });
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isAdded, setIsAdded] = useState<boolean>(false);

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  // 🔹 Fetch giống API thật
  useEffect(() => {
    fakeFetchTasks()
      .then((data) => {
        setTasks(data);
      })
      .catch(() => {
        setError("Failed to load tasks");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // 🔹 Sync localStorage khi tasks thay đổi
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isLoading]);

  // 🔹 Actions (giống gọi API nhưng sync local)
  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
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

    setTasks((prev) => {
      const updated = prev.filter((emp) => emp.id !== selectedTask);
      localStorage.setItem("tasks", JSON.stringify(updated));
      return updated;
    });

    handleCloseDialog2();
  };

  const updateTask = (task: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
  };

  /* const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }; */

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task)),
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        error,
        addTask,
        updateTask,
        /* removeTask, */
        updateTaskStatus,
        isAdded,
        isOpenDialog,
        handleConfirmDelete2,
        handleCloseDialog2,
        handleOpenDialog,
        isUpdated,
        setIsUpdated
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
