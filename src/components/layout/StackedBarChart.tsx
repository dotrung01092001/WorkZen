"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { useTask } from "@/contexts/TaskContext";
import { useEmployee } from "@/contexts/EmployeeContext";
import { motion } from "framer-motion";

const StackedBarChart = () => {
  const { tasks } = useTask();
  const { employees } = useEmployee();

  const statusTypes = ["todo", "in_progress", "review", "done"];

  const statusColorMap: Record<string, string> = {
    todo: "#1E3A8A",
    in_progress: "#2563EB",
    review: "#38BDF8",
    done: "#A5F3FC",
  };

  const employeesWithTaskCount = employees.map((emp) => {
    const employeeTasks = tasks.filter((t) => t.assignee === emp.id);

    const statusCount: Record<string, number> = {};
    statusTypes.forEach((status) => {
      statusCount[status] = employeeTasks.filter(
        (t) => t.status === status,
      ).length;
    });

    const totalTasks = Object.values(statusCount).reduce((a, b) => a + b, 0);

    return {
      ...emp,
      statusCount,
      totalTasks,
    };
  });

  const top8Employees = employeesWithTaskCount
    .sort((a, b) => b.totalTasks - a.totalTasks)
    .slice(0, 8);

  const chartData = top8Employees.map((emp) => ({
    name: emp.name,
    ...emp.statusCount,
  }));

  return (
    <motion.div
      className="w-full h-80 bg-white dark:bg-black p-6 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl shadow-gray-500"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.65, type: "spring", stiffness: 100 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />

          {statusTypes.map((status) => (
            <Bar
              key={status}
              dataKey={status}
              stackId="a"
              fill={statusColorMap[status]}
              radius={[6, 6, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default StackedBarChart;
