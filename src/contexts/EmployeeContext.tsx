import { useState, createContext, useContext } from "react";
import { type CreateEmployeePayload, type Employee } from "../types/employee";
import { EMPLOYEES_MOCK } from "../lib/mock-data";

type ImportEmployeesResult = {
  total: number;
  added: number;
  skippedExisting: number;
  skippedDuplicateInFile: number;
};

type EmployeeContextType = {
  employees: Employee[];
  addEmployee: (
    employee: Employee,
  ) => { ok: true } | { ok: false; reason: "duplicate_email" };
  updateEmployee: (employee: Employee) => void;
  importEmployees: (rows: CreateEmployeePayload[]) => ImportEmployeesResult;
  /* removeEmployee: (id: string) => void; */
  isAdded: boolean;
  isOpenDialog: boolean;
  handleOpenDialog: (employee: Employee) => void;
  handleCloseDialog: () => void;
  handleConfirmDelete: () => void;
  isUpdated: boolean;
};

const EmployeeContext = createContext<EmployeeContextType | null>(null);

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export function EmployeeProvider({ children }: { children: React.ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const stored = localStorage.getItem("employees");
    return stored ? JSON.parse(stored) : EMPLOYEES_MOCK;
  });

  const [isAdded, setIsAdded] = useState<boolean>(false);

  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );

  const handleOpenDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
    setSelectedEmployee(null);
  };

  const handleConfirmDelete = () => {
    if (!selectedEmployee) return;

    setEmployees((prev) => {
      const updated = prev.filter((emp) => emp.id !== selectedEmployee.id);
      localStorage.setItem("employees", JSON.stringify(updated));
      return updated;
    });

    handleCloseDialog();
  };

  const addEmployee = (
    employee: Employee,
  ): { ok: true } | { ok: false; reason: "duplicate_email" } => {
    const candidateEmail = normalizeEmail(employee.email);
    const isDuplicate = employees.some(
      (item) => normalizeEmail(item.email) === candidateEmail,
    );

    if (isDuplicate) {
      return { ok: false, reason: "duplicate_email" };
    }

    const next = [...employees, employee];
    setEmployees(next);
    localStorage.setItem("employees", JSON.stringify(next));

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);

    return { ok: true };
  };

  const importEmployees = (
    rows: CreateEmployeePayload[],
  ): ImportEmployeesResult => {
    const existingEmails = new Set(
      employees.map((employee) => normalizeEmail(employee.email)),
    );
    const fileEmails = new Set<string>();

    const nextEmployees: Employee[] = [];
    let skippedExisting = 0;
    let skippedDuplicateInFile = 0;

    rows.forEach((row) => {
      const email = normalizeEmail(row.email);

      if (existingEmails.has(email)) {
        skippedExisting += 1;
        return;
      }

      if (fileEmails.has(email)) {
        skippedDuplicateInFile += 1;
        return;
      }

      fileEmails.add(email);
      nextEmployees.push({
        id: crypto.randomUUID(),
        ...row,
        password: "",
      });
    });

    if (nextEmployees.length > 0) {
      const updated = [...employees, ...nextEmployees];
      setEmployees(updated);
      localStorage.setItem("employees", JSON.stringify(updated));
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2500);
    }

    return {
      total: rows.length,
      added: nextEmployees.length,
      skippedExisting,
      skippedDuplicateInFile,
    };
  };

  const updateEmployee = (employee: Employee) => {
    setEmployees(
      employees.map((emp) => (emp.id === employee.id ? employee : emp)),
    );
    localStorage.setItem(
      "employees",
      JSON.stringify(
        employees.map((emp) => (emp.id === employee.id ? employee : emp)),
      ),
    );

    setIsUpdated(true);
    setTimeout(() => setIsUpdated(false), 2500);
  };

  /* const removeEmployee = (id: string) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
    localStorage.setItem(
      "employees",
      JSON.stringify(employees.filter((employee) => employee.id !== id)),
    );
  }; */

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        updateEmployee,
        importEmployees,
        /* removeEmployee, */
        isAdded,
        isOpenDialog,
        handleCloseDialog,
        handleOpenDialog,
        handleConfirmDelete,
        isUpdated
      }}
    >
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
