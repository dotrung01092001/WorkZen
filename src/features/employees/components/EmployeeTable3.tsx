"use client";

import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react"

import { DataTable2 } from "@/components/commons/DataTable2";
import { useEmployee } from "@/contexts/EmployeeContext";
import { type Employee } from "../../../types/employee";
import { type ColumnDef } from "@tanstack/react-table";
import { useSearchStore } from "@/store/useSearchStore";
import {useRouteLoading} from '@/hooks/useRouterLoading'
import EmployeeTableSkeleton1 from "./EmployeeTableSkeleton1";
import { useMemo } from "react";

export function EmployeeTable3() {
  const { employees } = useEmployee();
  const { search } = useSearchStore();

  const filteredEmployees = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    if (!normalizedSearch) {
      return employees;
    }

    return employees.filter((employee) => {
      return (
        employee.name.toLowerCase().includes(normalizedSearch) ||
        employee.email.toLowerCase().includes(normalizedSearch) ||
        employee.role.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [employees, search]);

  

  const columns: ColumnDef<Employee>[] = useMemo(
    () => [
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
    ],
    [],
  );

  const isRouteLoading = useRouteLoading(600);
  if (isRouteLoading) return <EmployeeTableSkeleton1 />;

  return <DataTable2 data={filteredEmployees} columns={columns} />;
}
