import { 
  useState, 
  createContext, 
  useContext, 
  useEffect 
} from "react"

import { type Task } from "@/types/task"
import { MOCK_TASKS } from "@/lib/mock-tasks"
import type { TaskStatus } from "@/types/common"

type TaskContextType = {
  tasks: Task[]
  isLoading: boolean
  error: string | null
  addTask: (task: Task) => void
  updateTask: (task: Task) => void
  removeTask: (id: string) => void
  updateTaskStatus: (id: string, status: TaskStatus) => void
}

const TaskContext = createContext<TaskContextType | null>(null)

// 🔹 Fake API function
function fakeFetchTasks(): Promise<Task[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = localStorage.getItem("tasks")
      if (stored) {
        resolve(JSON.parse(stored))
      } else {
        resolve(MOCK_TASKS)
      }
    }, 1000) // giả lập network delay
  })
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 🔹 Fetch giống API thật
  useEffect(() => {
    fakeFetchTasks()
      .then((data) => {
        setTasks(data)
      })
      .catch(() => {
        setError("Failed to load tasks")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  // 🔹 Sync localStorage khi tasks thay đổi
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }, [tasks, isLoading])

  // 🔹 Actions (giống gọi API nhưng sync local)
  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task])
  }

  const updateTask = (task: Task) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? task : t))
    )
  }

  const removeTask = (id: string) => {
    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    )
  }

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    )
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        error,
        addTask,
        updateTask,
        removeTask,
        updateTaskStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTask() {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error("useTask must be used inside TaskProvider")
  return ctx
}