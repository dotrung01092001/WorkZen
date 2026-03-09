import StackedBarChart from "@/components/layout/StackedBarChart";
import PieChart from "@/components/layout/PieChart";
import { useEmployee } from "@/contexts/EmployeeContext";
import { useTask } from "@/contexts/TaskContext";
import TaskTable2 from "@/features/tasks/components/TaskTable2";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useRouteLoading } from "@/hooks/useRouterLoading";
import DashboardSkeleton from "./DashboardSkeleton";
import DashboardAnalytics from "@/components/layout/DashboardAnalytics";

export default function DashboardPage() {
  const { employees } = useEmployee();
  const { tasks } = useTask();
  const isRouteLoading = useRouteLoading(600);

  if (isRouteLoading) return <DashboardSkeleton />;

  return (
    <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>

      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <NavLink to="/employees">
          <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/60 dark:hover:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Employees
            </p>
            <p className="text-2xl font-bold">{employees.length}</p>
          </article>
        </NavLink>
        <NavLink to="/tasks">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/60 dark:hover:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">Total Tasks</p>
            <p className="text-2xl font-bold">{tasks.length}</p>
          </div>
        </NavLink>
      </motion.div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
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
        <DashboardAnalytics />
      </div>
    </section>
  );
}
