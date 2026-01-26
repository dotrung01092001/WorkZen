import { type Employee } from '@/features/employees/types';

export const EMPLOYEES_MOCK: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'staff',
    status: 'inactive',
  },
];
