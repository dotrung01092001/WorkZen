"use client";

import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react"

import { DataTable2 } from "@/components/commons/DataTable2";
import { useEmployee } from "@/contexts/EmployeeContext";
import { type Employee } from "../../../types/employee";
import { type ColumnDef } from "@tanstack/react-table";
import { useSearchStore } from "@/store/useSearchStore";
import {useRouteLoading} from '@/hooks/useRouterLoading'
import TaskTableSkeleTon from '@/features/tasks/components/TaskTableSkeleton'

export function EmployeeTable3() {
  const { employees } = useEmployee();
  const { search } = useSearchStore();

  const isRouteLoading = useRouteLoading(600);
  if (isRouteLoading) return <TaskTableSkeleTon />

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
      )
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
      )
    },
    },
  ];
  return <DataTable2 data={filteredEmployees} columns={columns} />;
}
