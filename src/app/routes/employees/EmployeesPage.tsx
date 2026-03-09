import { EmployeeTable3 } from "@/features/employees/components/EmployeeTable3";
import { EmployeeExcelImport } from "@/features/employees/components/EmployeeExcelImport";

export default function EmployeesPage() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Employees</h1>
      </div>

      <EmployeeExcelImport />
      <EmployeeTable3 />
    </section>
  );
}
