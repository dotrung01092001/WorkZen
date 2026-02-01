import { type Employee } from '../types/employee';

export const EMPLOYEES_MOCK: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Employee',
    status: 'inactive',
  },
];
