"use client";

import { Pie, PieChart, Tooltip } from "recharts";
import { useTask } from "@/contexts/TaskContext";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "Task status distribution with percentage";

const chartConfig = {
  value: {
    label: "Tasks",
  },
  todo: {
    label: "Todo",
    color: "#1E3A8A",
  },
  in_progress: {
    label: "In Progress",
    color: "#2563EB",
  },
  review: {
    label: "Review",
    color: "#38BDF8",
  },
  done: {
    label: "Done",
    color: "#A5F3FC",
  },
} satisfies ChartConfig;

export default function ChartPieLegend() {
  const { tasks } = useTask();

  const total = tasks.length;
  const statusTypes = ["todo", "in_progress", "review", "done"];

  const colorMap: Record<string, string> = {
    todo: "#1E3A8A",
    in_progress: "#2563EB",
    review: "#38BDF8",
    done: "#A5F3FC",
  };

  const chartData = statusTypes.map((status) => {
    const count = tasks.filter((t) => t.status === status).length;
    const percent = total ? ((count / total) * 100).toFixed(1) : "0";

    return {
      status,
      value: count,
      percent,
      fill: colorMap[status],
    };
  });

  return (
    <motion.div
      className="shadow-xl shadow-gray-500 rounded-xl"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.65, type: "spring", stiffness: 100 }}
    >
      <Card className="flex flex-col dark:bg-black">
        <CardHeader className="items-center pb-0">
          <CardTitle>Task Status Distribution</CardTitle>
          <CardDescription>Overall workflow overview</CardDescription>
        </CardHeader>

        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-50"
          >
            <PieChart>
              <Tooltip
                formatter={(value: number) => {
                  const percent = total
                    ? ((value / total) * 100).toFixed(1)
                    : 0;
                  return `${value} tasks (${percent}%)`;
                }}
              />

              <Pie
                data={chartData}
                dataKey="value"
                nameKey="status"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={4}
              />

              <ChartLegend
                content={
                  <ChartLegendContent
                    nameKey="status"
                    formatter={(value: number, entry: any) =>
                      `${value} (${entry.payload.percent}%)`
                    }
                  />
                }
                className="-translate-y-2 flex gap-3 *:basis-1/2 *:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
