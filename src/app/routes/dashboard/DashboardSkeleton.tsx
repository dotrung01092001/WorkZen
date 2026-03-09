import Skeleton from "@/components/ui/Skeleton";
import { motion } from "framer-motion";
import TaskTableSkeleTon from "@/features/tasks/components/TaskTableSkeleton";

export default function DashboardSkeleton() {
  return (
    <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <Skeleton className="h-8 w-44" />

      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Skeleton className="h-24 rounded-xl border border-slate-200 dark:border-slate-700" />
        <Skeleton className="h-24 rounded-xl border border-slate-200 dark:border-slate-700" />
      </motion.div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, type: "spring", stiffness: 100 }}
          >
            <Skeleton className="h-80 w-full rounded-xl border border-slate-200 dark:border-slate-800" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, type: "spring", stiffness: 100 }}
          >
            <Skeleton className="h-80 w-full rounded-xl border border-slate-200 dark:border-slate-800" />
          </motion.div>
        </div>
        <div>
          <TaskTableSkeleTon />
        </div>
      </div>
    </section>
  );
}
