import { EmployeeTable3 } from "@/features/employees/components/EmployeeTable3";
import TaskTable2 from "@/features/tasks/components/TaskTable2";
import { useAuth } from "@/hooks/useAuth";
import { NavLink } from "react-router-dom";

export default function DashboardPage() {

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white h-[85vh] w-full rounded-xl p-4 overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-lg border dark:border-white bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Employees</p>
          <p className="text-2xl font-bold">24</p>
        </div>

        <div className="rounded-lg border dark:border-white bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Tasks</p>
          <p className="text-2xl font-bold">112</p>
        </div>
      </div>

      <div className="flex gap-10 mt-6">
         <NavLink to='/employees' className='flex-1'>
          <EmployeeTable3 />
        </NavLink>
        <NavLink to='/tasks' className='flex-1'>
          <TaskTable2 />
        </NavLink>
      </div>
    </div>
  );
}
