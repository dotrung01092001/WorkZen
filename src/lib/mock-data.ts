import { type Employee } from '../types/employee';

export const EMPLOYEES_MOCK: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    password:'',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Employee',
    status: 'Inactive',
    password: '',
  },
];
