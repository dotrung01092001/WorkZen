import { useState } from 'react';
import { type Employee } from '../types';
import { EMPLOYEES_MOCK } from '@/lib/mock-data';

export function useEmployees() {
  const [employees] = useState<Employee[]>(EMPLOYEES_MOCK);

  return {
    employees,
    total: employees.length,
  };
}
