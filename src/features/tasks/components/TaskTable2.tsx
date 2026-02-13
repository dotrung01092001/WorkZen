import { useTask } from "@/contexts/TaskContext";
import type { Task } from "@/types/task";
import { DataTable2 } from "@/components/commons/DataTable2";
import { useEmployee } from "@/contexts/EmployeeContext";
import { useAuth } from "@/hooks/useAuth";
import { filterTasksByRole } from "@/utils/filterTasksByRole";
import TaskStatusInput from "@/components/ui/TaskStatusInput";
import { type ColumnDef } from "@tanstack/react-table";
import { useSearchStore } from "@/store/useSearchStore";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import TaskTitle from "@/components/ui/TaskTitle";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TaskTable2 = ({ setIsOpenModal, setEditingTask }) => {
  const { tasks, updateTaskStatus, updateTask, removeTask } = useTask();
  const { employees } = useEmployee();
  const { user } = useAuth();
  const { search } = useSearchStore();

  const filteredTasks = (user ? filterTasksByRole(tasks, user) : tasks).filter(
    (task) => {
      return (
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        employees
          .find((e) => e.id === task.assignee)
          ?.name.toLowerCase()
          .includes(search.toLowerCase())
      );
    },
  );

  type TaskRow = Task & { assigneeName: string };

  const data: TaskRow[] = filteredTasks.map((task) => ({
    ...task,
    assigneeName: employees.find((e) => e.id === task.assignee)?.name ?? "—",
  }));

  const columns: ColumnDef<TaskRow>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        return (
          <TaskTitle
            title={row.original.title}
            description={row.original.description}
          />
        );
      },
    },
    {
      accessorKey: "assigneeName",
      header: "Assignee",
    },
    {
      accessorKey: "priority",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Priority
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <TaskStatusInput
          value={row.original.status}
          onChange={(newStatus) => updateTaskStatus(row.original.id, newStatus)}
        />
      ),
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const task = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  updateTask(task);
                  setIsOpenModal(true);
                  setEditingTask(task);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  removeTask(task.id);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return <DataTable2 data={data} columns={columns} />;
};

export default TaskTable2;
