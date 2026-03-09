"use client";

import {
  type TooltipProps,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

import { useTask } from "@/contexts/TaskContext";
import { useEmployee } from "@/contexts/EmployeeContext";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const statusConfig = [
  { key: "todo", label: "Todo", color: "#1d4ed8" },
  { key: "in_progress", label: "In Progress", color: "#2563eb" },
  { key: "review", label: "Review", color: "#38bdf8" },
  { key: "done", label: "Done", color: "#22c55e" },
] as const;

type ChartRow = {
  name: string;
  total: number;
  todo: number;
  in_progress: number;
  review: number;
  done: number;
};

function ChartTooltipContent({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (!active || !payload?.length) {
    return null;
  }

  const row = payload[0]?.payload as ChartRow;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <p className="mb-2 font-semibold text-slate-900 dark:text-slate-100">{label}</p>
      <p className="mb-2 text-slate-500 dark:text-slate-400">Total: {row.total} tasks</p>
      <div className="space-y-1">
        {statusConfig.map((status) => (
          <div key={status.key} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: status.color }}
              />
              {status.label}
            </span>
            <span className="font-medium text-slate-900 dark:text-slate-100">
              {row[status.key]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const StackedBarChart = () => {
  const { tasks } = useTask();
  const { employees } = useEmployee();

  const chartData = useMemo<ChartRow[]>(() => {
    const employeeData = employees.map((employee) => {
      const employeeTasks = tasks.filter((task) => task.assignee === employee.id);
      const todo = employeeTasks.filter((task) => task.status === "todo").length;
      const in_progress = employeeTasks.filter(
        (task) => task.status === "in_progress",
      ).length;
      const review = employeeTasks.filter((task) => task.status === "review").length;
      const done = employeeTasks.filter((task) => task.status === "done").length;
      const total = todo + in_progress + review + done;

      return {
        name: employee.name,
        total,
        todo,
        in_progress,
        review,
        done,
      };
    });

    return employeeData.sort((a, b) => b.total - a.total).slice(0, 8);
  }, [employees, tasks]);

  const totalShownTasks = useMemo(
    () => chartData.reduce((sum, row) => sum + row.total, 0),
    [chartData],
  );

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.22),transparent_52%)]" />
      <Card className="relative border-slate-200/80 bg-white/95 shadow-lg shadow-slate-300/30 dark:border-slate-800 dark:bg-slate-950/90 dark:shadow-black/20">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="text-base">Team Workload Distribution</CardTitle>
              <CardDescription>Top 8 employees by task volume</CardDescription>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-right dark:border-slate-700 dark:bg-slate-900">
              <p className="text-xs text-slate-500 dark:text-slate-400">Tasks shown</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {totalShownTasks}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-1">
          <div className="h-[215px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 6, left: -22, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(148 163 184 / 0.22)" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "rgb(100 116 139)", fontSize: 12 }}
                />
                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "rgb(100 116 139)", fontSize: 12 }}
                />
                <Tooltip cursor={{ fill: "rgb(148 163 184 / 0.10)" }} content={<ChartTooltipContent />} />
                {statusConfig.map((status) => (
                  <Bar
                    key={status.key}
                    dataKey={status.key}
                    stackId="workload"
                    fill={status.color}
                    radius={[5, 5, 0, 0]}
                    maxBarSize={46}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap gap-2">
            {statusConfig.map((status) => (
              <span
                key={status.key}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: status.color }} />
                {status.label}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StackedBarChart;
