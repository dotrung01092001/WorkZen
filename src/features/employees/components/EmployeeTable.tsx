import { DataTable } from '@/components/commons/DataTable';
import { useEmployees } from '../hooks/useEmployees';
import { type Employee } from '../types';

export function EmployeeTable() {
  const { employees } = useEmployees();

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
  ] satisfies { key: keyof Employee; label: string }[];

  return <DataTable<Employee> data={employees} columns={columns} />;
}
