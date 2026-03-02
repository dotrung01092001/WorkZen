import Skeleton from "@/components/ui/Skeleton";
import { motion } from "framer-motion";
import TaskTableSkeleTon from "@/features/tasks/components/TaskTableSkeleton";

export default function DashboardSkeleton() {
  return (
    <div className="bg-[#bcceeb] dark:bg-[#00296b] text-black dark:text-white h-[85vh] w-full rounded-xl p-4 overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <motion.div
        className="grid grid-cols-4 gap-4 mb-4 "
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        <Skeleton className="rounded-lg border border-gray-300 shadow-md shadow-[#6d6d6d] w-[20vw] h-20" />
        <Skeleton className="rounded-lg border border-gray-300 shadow-md shadow-[#6d6d6d] w-[20vw] h-20 ml-3" />
      </motion.div>
      <div className="grid grid-rows-1 gap-3">
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, type: "spring", stiffness: 100 }}
          >
            <Skeleton className="h-80 w-full" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, type: "spring", stiffness: 100 }}
          >
            <Skeleton className="h-80 w-full" />
          </motion.div>
        </div>
        <TaskTableSkeleTon />
      </div>
    </div>
  );
}
