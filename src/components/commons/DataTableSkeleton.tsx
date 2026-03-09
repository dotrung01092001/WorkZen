import { motion } from "framer-motion";
import Skeleton from "@/components/ui/Skeleton";

type DataTableSkeletonProps = {
  columns?: number;
  rows?: number;
};

export default function DataTableSkeleton({
  columns = 5,
  rows = 5,
}: DataTableSkeletonProps) {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-4 flex justify-end">
        <Skeleton className="h-9 w-24 rounded-md" />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/60">
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: columns }).map((_, index) => (
              <Skeleton
                key={`header-${index}`}
                className={index === 0 ? "h-4 w-20" : "h-4 w-14"}
              />
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="grid gap-4 p-4"
              style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton
                  key={`cell-${rowIndex}-${colIndex}`}
                  className={colIndex === 0 ? "h-4 w-4/5" : "h-4 w-full"}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 py-4">
        <Skeleton className="h-8 w-20 rounded-md" />
        <Skeleton className="h-8 w-16 rounded-md" />
      </div>
    </motion.div>
  );
}
