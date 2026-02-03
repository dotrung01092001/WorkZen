import { useState, createContext, useContext } from "react";
import { type Employee } from "../types/employee";
import {EMPLOYEES_MOCK} from '../lib/mock-data'

type EmployeeContextType = {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  removeEmployee: (id: string) => void;
};

const EmployeeContext = createContext<EmployeeContextType | null>(null);

export function EmployeeProvider({ children }: { children: React.ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const stored = localStorage.getItem('employees');
    return stored ? JSON.parse(stored) : EMPLOYEES_MOCK;
  });

  const addEmployee = (employee: Employee) => {
    setEmployees([...employees, employee]);
    localStorage.setItem('employees', JSON.stringify([...employees, employee]));
  };

  const updateEmployee = (employee: Employee) => {
    setEmployees(employees.map(emp => emp.id === employee.id ? employee : emp));
    localStorage.setItem('employees', JSON.stringify(employees.map(emp => emp.id === employee.id ? employee : emp)));
  };

  const removeEmployee = (id: string) => {
    setEmployees(employees.filter(employee => employee.id !== id));
    localStorage.setItem('employees', JSON.stringify(employees.filter(employee => employee.id !== id)));
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, removeEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useEmployee() {
  const ctx = useContext(EmployeeContext);
  if (!ctx) throw new Error("useEmployee must be used inside EmployeeProvider");
  return ctx;
}