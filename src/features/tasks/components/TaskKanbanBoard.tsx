import { useMemo, type ReactNode } from "react";
import type { Task } from "@/types/task";
import type { TaskStatus } from "@/types/common";
import { useTask } from "@/contexts/TaskContext";
import { useEmployee } from "@/contexts/EmployeeContext";
import { BadgeCheck, Clock3, CircleDashed, Eye } from "lucide-react";
import { useTaskViewStore } from "@/store/useTaskViewStore";

const columns: { key: TaskStatus; title: string; icon: ReactNode }[] = [
  { key: "todo", title: "Todo", icon: <CircleDashed className="h-4 w-4" /> },
  { key: "in_progress", title: "In Progress", icon: <Clock3 className="h-4 w-4" /> },
  { key: "review", title: "Review", icon: <Eye className="h-4 w-4" /> },
  { key: "done", title: "Done", icon: <BadgeCheck className="h-4 w-4" /> },
];

export default function TaskKanbanBoard({ tasks }: { tasks: Task[] }) {
  const { updateTaskStatus, addTimelineEvent } = useTask();
  const { employees } = useEmployee();
  const { filters, setFilter } = useTaskViewStore();

  const grouped = useMemo(() => {
    return columns.reduce<Record<TaskStatus, Task[]>>(
      (acc, column) => {
        acc[column.key] = tasks.filter((task) => task.status === column.key);
        return acc;
      },
      { todo: [], in_progress: [], review: [], done: [] },
    );
  }, [tasks]);

  const employeeMap = useMemo(
    () => new Map(employees.map((employee) => [employee.id, employee.name])),
    [employees],
  );

  return (
    <div className="grid gap-4 xl:grid-cols-4">
      {columns.map((column) => (
        <section
          key={column.key}
          className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/60"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            const taskId = event.dataTransfer.getData("task-id");
            if (!taskId) return;
            const currentTask = tasks.find((task) => task.id === taskId);
            updateTaskStatus(taskId, column.key);
            addTimelineEvent(taskId, "moved on kanban board", `to ${column.title}`);
            if (
              filters.status !== "all" &&
              currentTask &&
              currentTask.status !== column.key
            ) {
              setFilter("status", "all");
            }
          }}
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
              {column.icon}
              {column.title}
            </p>
            <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs dark:bg-slate-700">
              {grouped[column.key].length}
            </span>
          </div>

          <div className="space-y-2">
            {grouped[column.key].map((task) => (
              <article
                key={task.id}
                draggable
                onDragStart={(event) => event.dataTransfer.setData("task-id", task.id)}
                className="cursor-grab rounded-lg border border-slate-200 bg-white p-3 shadow-sm active:cursor-grabbing dark:border-slate-700 dark:bg-slate-900"
              >
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {task.title}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {employeeMap.get(task.assignee ?? "") ?? "Unassigned"}
                </p>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="rounded-full border border-slate-200 px-2 py-0.5 dark:border-slate-700">
                    {task.priority}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">{task.dueDate}</span>
                </div>
              </article>
            ))}
            {grouped[column.key].length === 0 && (
              <p className="rounded-lg border border-dashed border-slate-300 p-4 text-center text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
                Drop task here
              </p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
