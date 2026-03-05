import Skeleton from "@/components/ui/Skeleton";
import { motion } from "framer-motion";

interface DataTable2SkeletonProps {
  columns?: number;
  rows?: number;
}

export default function DataTableSkeleton({
  columns = 6,
  rows = 3,
}: DataTable2SkeletonProps) {
  return (
    <motion.div
      className="space-y-4 max-md:w-170"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, type: "spring", stiffness: 200 }}
    >
      {/* Columns Button */}
      <div className="flex justify-end">
        <Skeleton className="h-9 w-24" />
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-md border bg-white dark:bg-black shadow-lg">
        {/* Header */}
        <div className="border-b">
          <div
            className="grid gap-4 p-4"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {Array.from({ length: columns }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-3/4" />
            ))}
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid gap-4 p-4"
              style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
            >
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton key={colIndex} className="h-4 w-full" />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-end space-x-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
      </div>
    </motion.div>
  );
}
