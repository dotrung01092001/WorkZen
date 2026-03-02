import StackedBarChart from "@/components/layout/StackedBarChart";
import PieChart from "@/components/layout/PieChart";
import { useEmployee } from "@/contexts/EmployeeContext";
import { useTask } from "@/contexts/TaskContext";
import TaskTable2 from "@/features/tasks/components/TaskTable2";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {useRouteLoading} from '@/hooks/useRouterLoading'
import DashboardSkeleton from './DashboardSkeleton'

export default function DashboardPage() {
  const { employees } = useEmployee();
  const { tasks } = useTask();
 const isRouteLoading = useRouteLoading(600);

 if (isRouteLoading) return <DashboardSkeleton />

  return (
    <div className="bg-[#bcceeb] dark:bg-[#00296b] text-black dark:text-white h-[85vh] w-full rounded-xl p-4 overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <motion.div
        className="grid grid-cols-4 gap-4 mb-4 "
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
      >
        <NavLink to="/employees">
          <div className="rounded-lg border dark:border-white bg-white dark:bg-black p-4 border-b border-gray-300 shadow-md shadow-[#6d6d6d]">
            <p className="text-sm text-muted-foreground">Total Employees</p>
            <p className="text-2xl font-bold">{employees.length}</p>
          </div>
        </NavLink>
        <NavLink to="/tasks">
          <div className="rounded-lg border dark:border-white bg-white dark:bg-black p-4  border-gray-300 shadow-md shadow-[#6d6d6d]">
            <p className="text-sm text-muted-foreground">Total Tasks</p>
            <p className="text-2xl font-bold">{tasks.length}</p>
          </div>
        </NavLink>
      </motion.div>

      <div className="grid grid-rows-1 gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <StackedBarChart />
          </div>
          <div>
            <PieChart />
          </div>
        </div>
        <div>
          <TaskTable2 />
        </div>
      </div>
    </div>
  );
}
