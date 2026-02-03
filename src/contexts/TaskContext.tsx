import { useState, createContext, useContext } from "react";
import { type Task } from "@/types/task";
import { MOCK_TASKS } from "@/lib/mock-tasks";

type TaskContextType = {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    removeTask: (id: string) => void;
};

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const stored = localStorage.getItem('tasks');
        return stored ? JSON.parse(stored) : MOCK_TASKS;
    });

    const addTask = (task: Task) => {
        setTasks([...tasks, task]);
        localStorage.setItem('tasks', JSON.stringify([...tasks, task]));
    }

    const updateTask = (task: Task) => { 
        setTasks(tasks.map(t => t.id === task.id ? task : t));
        localStorage.setItem('tasks', JSON.stringify(tasks.map(t => t.id === task.id ? task : t)));
    }

    const removeTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
        localStorage.setItem('tasks', JSON.stringify(tasks.filter(task => task.id !== id)));
    }

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, removeTask }}>
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