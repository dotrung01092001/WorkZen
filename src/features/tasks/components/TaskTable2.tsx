import { useMemo, type Dispatch, type SetStateAction } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { useTask } from "@/contexts/TaskContext";
import type { Task } from "@/types/task";
import { DataTable2 } from "@/components/commons/DataTable2";
import { useEmployee } from "@/contexts/EmployeeContext";
import { useAuth } from "@/hooks/useAuth";
import { filterTasksByRole } from "@/utils/filterTasksByRole";
import TaskStatusInput from "@/components/ui/TaskStatusInput";
import { useSearchStore } from "@/store/useSearchStore";
import { Button } from "@/components/ui/button";
import TaskTitle from "@/components/ui/TaskTitle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TaskTableSkeleTon from "./TaskTableSkeleton";
import { useRouteLoading } from "@/hooks/useRouterLoading";

interface TaskTable2Props {
  setIsOpenModal?: Dispatch<SetStateAction<boolean>>;
  setEditingTask?: Dispatch<SetStateAction<Task | null>>;
  tasksOverride?: Task[];
  onOpenActivity?: (taskId: string) => void;
}

type TaskRow = Task & { assigneeName: string };

const TaskTable2 = ({
  setIsOpenModal,
  setEditingTask,
  tasksOverride,
  onOpenActivity,
}: TaskTable2Props) => {
  const { tasks, updateTaskStatus, handleOpenDialog, isLoading } = useTask();
  const { employees } = useEmployee();
  const { user } = useAuth();
  const { search } = useSearchStore();
  const isRouterLoading = useRouteLoading(600);

  const employeeNameById = useMemo(
    () => new Map(employees.map((employee) => [employee.id, employee.name])),
    [employees],
  );

  const filteredTasks = useMemo(() => {
    const baseTasks = tasksOverride ?? tasks;
    const scopedTasks = user ? filterTasksByRole(baseTasks, user) : baseTasks;
    const normalizedSearch = search.toLowerCase().trim();

    if (!normalizedSearch) {
      return scopedTasks;
    }

    return scopedTasks.filter((task) => {
      const assigneeName = employeeNameById.get(task.assignee ?? "") ?? "";
      return (
        task.title.toLowerCase().includes(normalizedSearch) ||
        assigneeName.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [employeeNameById, search, tasks, tasksOverride, user]);

  const data: TaskRow[] = useMemo(
    () =>
      filteredTasks.map((task) => ({
        ...task,
        assigneeName: employeeNameById.get(task.assignee ?? "") ?? "—",
      })),
    [employeeNameById, filteredTasks],
  );

  const columns: ColumnDef<TaskRow>[] = useMemo(() => {
    const baseColumns: ColumnDef<TaskRow>[] = [
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
          <TaskTitle
            title={row.original.title}
            description={row.original.description}
          />
        ),
      },
      {
        accessorKey: "assigneeName",
        header: "Assignee",
      },
      {
        accessorKey: "priority",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Priority
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) =>
          user?.role === "Employee" && row.original.assignee !== user.id ? (
            <span>{row.original.status}</span>
          ) : (
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
    ];

    if (setIsOpenModal && setEditingTask && user?.role !== "Employee") {
      baseColumns.push({
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
                    setIsOpenModal(true);
                    setEditingTask(task);
                  }}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleOpenDialog(task.id)}>
                  Delete
                </DropdownMenuItem>
                {onOpenActivity && (
                  <DropdownMenuItem onClick={() => onOpenActivity(task.id)}>
                    Activity
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      });
    } else if (onOpenActivity) {
      baseColumns.push({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Button variant="outline" size="sm" onClick={() => onOpenActivity(row.original.id)}>
            Activity
          </Button>
        ),
      });
    }

    return baseColumns;
  }, [handleOpenDialog, onOpenActivity, setEditingTask, setIsOpenModal, updateTaskStatus, user]);

  if (isLoading || isRouterLoading) {
    return <TaskTableSkeleTon />;
  }

  return <DataTable2 data={data} columns={columns} />;
};

export default TaskTable2;
