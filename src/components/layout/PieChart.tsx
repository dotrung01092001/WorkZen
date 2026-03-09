"use client";

import { useMemo } from "react";
import {
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
} from "recharts";
import { useTask } from "@/contexts/TaskContext";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const statusConfig = [
  { key: "todo", label: "Todo", color: "#1d4ed8" },
  { key: "in_progress", label: "In Progress", color: "#2563eb" },
  { key: "review", label: "Review", color: "#38bdf8" },
  { key: "done", label: "Done", color: "#22c55e" },
] as const;

type ChartSlice = {
  status: string;
  label: string;
  value: number;
  percent: number;
  fill: string;
};

function PieTooltipContent({
  active,
  payload,
}: TooltipProps<number, string>) {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0]?.payload as ChartSlice;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <p className="font-semibold text-slate-900 dark:text-slate-100">{item.label}</p>
      <p className="mt-1 text-slate-600 dark:text-slate-300">
        {item.value} tasks ({item.percent.toFixed(1)}%)
      </p>
    </div>
  );
}

export default function ChartPieLegend() {
  const { tasks } = useTask();

  const totalTasks = tasks.length;
  const chartData = useMemo<ChartSlice[]>(() => {
    return statusConfig.map((status) => {
      const count = tasks.filter((task) => task.status === status.key).length;
      const percent = totalTasks ? (count / totalTasks) * 100 : 0;
      return {
        status: status.key,
        label: status.label,
        value: count,
        percent,
        fill: status.color,
      };
    });
  }, [tasks, totalTasks]);

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.16),transparent_50%)]" />
      <Card className="relative border-slate-200/80 bg-white/95 shadow-lg shadow-slate-300/30 dark:border-slate-800 dark:bg-slate-950/90 dark:shadow-black/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Task Status Breakdown</CardTitle>
          <CardDescription>Current delivery mix across all tasks</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4 pb-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="mx-auto h-[220px] w-full max-w-[240px] sm:h-[205px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="status"
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={86}
                strokeWidth={4}
                paddingAngle={3}
              >
                <Label
                  value={`${totalTasks}`}
                  position="center"
                  className="fill-slate-900 text-2xl font-semibold dark:fill-slate-100"
                />
                <Label
                  value="Total tasks"
                  position="center"
                  dy={20}
                  className="fill-slate-500 text-xs dark:fill-slate-400"
                />
              </Pie>
              <Tooltip content={<PieTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 sm:min-w-[180px]">
            {chartData.map((item) => (
              <div
                key={item.status}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-100">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.percent.toFixed(1)}%
                  </p>
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  {item.value} tasks
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
