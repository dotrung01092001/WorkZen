"use client";

import { DataTable2 } from "@/components/commons/DataTable2";
import { type Employee } from "../../../types/employee";
import { type ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSearchStore } from "@/store/useSearchStore";
import TaskTableSkeleTon from "@/features/tasks/components/TaskTableSkeleton";
import { useRouteLoading } from "@/hooks/useRouterLoading";
import EmployeeTableSkeleton2 from "./EmployeeTableSkeleton2";

export function EmployeeTable4({
  onEdit,
  employeeState,
  onDelete,
}: {
  onEdit: (employee: Employee) => void;
  employeeState: any;
  onDelete: (employee: Employee) => void;
}) {
  const { employees } = employeeState;
  const { search } = useSearchStore();

  const isRouteLoading = useRouteLoading(600);
  if (isRouteLoading) return <EmployeeTableSkeleton2 />;

  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase()) ||
      employee.role.toLowerCase().includes(search.toLowerCase())
    );
  });

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Role
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
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const employee = row.original;

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
              <DropdownMenuItem onClick={() => onEdit(employee)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(employee)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return <DataTable2 data={filteredEmployees} columns={columns} />;
}
