import { useTask } from "@/contexts/TaskContext";
import type { Task } from "@/types/task";
import { DataTable } from "@/components/commons/DataTable";
import { useEmployee } from "@/contexts/EmployeeContext";
import { useAuth } from "@/hooks/useAuth";
import { filterTasksByRole } from "@/utils/filterTasksByRole";
import TaskStatusInput from "@/components/ui/TaskStatusInput";
import type { JSX } from "react";

export function TaskTable() {
  const { tasks, updateTaskStatus } = useTask();
  const { employees } = useEmployee();
  const { user } = useAuth();

  const filteredTasks = user ? filterTasksByRole(tasks, user) : tasks;

  type TaskRow = Task & { assigneeName: string };

  const data: TaskRow[] = filteredTasks.map((task) => ({
    ...task,
    assigneeName: employees.find((e) => e.id === task.assignee)?.name ?? "—",
  }));

  const columns = [
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "assigneeName", label: "Assignee" },
    { key: "priority", label: "Priority" },
    {
      key: "status",
      label: "Status",
      render: (row: TaskRow) => (
        <TaskStatusInput
          value={row.status}
          onChange={(status) => updateTaskStatus(row.id, status)}
        />
      ),
    },
    { key: "dueDate", label: "Due Date" },
  ] satisfies {
    key: keyof TaskRow;
    label: string;
    render?: (row: TaskRow) => JSX.Element;
  }[];

  return <DataTable<TaskRow> data={data} columns={columns} />;
}
