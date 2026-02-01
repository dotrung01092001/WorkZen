import { useTask } from "@/contexts/TaskContext";
import type { Task } from "@/types/task";
import { DataTable } from "@/components/commons/DataTable";
import { useEmployee } from "@/contexts/EmployeeContext";

export function TaskTable() {
  const { tasks } = useTask();
  const { employees } = useEmployee();

  type TaskRow = Task & { assigneeName: string };

  const data: TaskRow[] = tasks.map(task => ({
    ...task,
    assigneeName:
      employees.find(e => e.id === task.assignee)?.name ?? "—",
  }));

  const columns = [
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "assigneeName", label: "Assignee" },
    { key: "priority", label: "Priority" },
    { key: "dueDate", label: "Due Date" },
  ] satisfies { key: keyof TaskRow; label: string }[];

  return <DataTable<TaskRow> data={data} columns={columns} />;
}
