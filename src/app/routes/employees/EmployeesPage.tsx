import { EmployeeTable3 } from "@/features/employees/components/EmployeeTable3";

export default function EmployeesPage() {
  return (
    <div className="h-[85vh] w-full rounded-xl p-5 bg-[#bcceeb] dark:bg-[#00296b] text-black dark:text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Employees</h1>
      </div>

      <EmployeeTable3 />
    </div>
  );
}
