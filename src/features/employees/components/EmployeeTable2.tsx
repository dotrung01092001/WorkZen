import { DataTable } from "@/components/commons/DataTable";
import { type Employee } from '../types';
import { useEmployees } from '../hooks/useEmployees';

interface Props {
  onEdit: (employee: Employee) => void;
  /* onDelete: (employee: Employee) => void; */
}

export function EmployeeTable2({ onEdit/* , onDelete */ }: Props) {
    const { employees } = useEmployees();

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    {
      key: 'status',
      label: 'Status',
      render: (row: Employee) => (
        <span
          style={{
            padding: '8px 16px',
            borderRadius: 12,
            fontSize: 16,
            background:
              row.status === 'active' ? '#dcfce7' : '#fee2e2',
            color:
              row.status === 'active' ? '#166534' : '#991b1b',
            width: 'full',
          }}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: 'action',
      label: 'Action',
      render: (row: Employee) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => onEdit(row)}
            style={{
              padding: '4px 16px',
              backgroundColor: 'blue',
              color: 'white',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            Edit
          </button>
          <button className="hover:bg-blue-400"
            /* onClick={() => onDelete(row)} */
            style={{
              padding: '4px 16px',
              backgroundColor: 'red',
              color: 'white',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return <DataTable data={employees} columns={columns} />;
}
