import { DataTable } from '@/components/commons/DataTable';
import { useEmployee } from '../../../contexts/EmployeeContext';
import { type Employee } from '../../../types/employee';

export function EmployeeTable() {
  const { employees } = useEmployee();

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
  ] satisfies { key: keyof Employee; label: string }[];

  return <DataTable<Employee> data={employees} columns={columns} />;
}
