"use client";

import { useMemo } from "react";
import { useTask } from "@/contexts/TaskContext";
import { useEmployee } from "@/contexts/EmployeeContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function isOverdue(taskDueDate: string) {
  const now = new Date();
  const due = new Date(taskDueDate);
  return due.getTime() < now.getTime();
}

export default function DashboardAnalytics() {
  const { tasks } = useTask();
  const { employees } = useEmployee();

  const metrics = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((task) => task.status === "done").length;
    const overdue = tasks.filter(
      (task) => task.status !== "done" && isOverdue(task.dueDate),
    ).length;
    const completionRate = total ? (done / total) * 100 : 0;
    const velocity = tasks.filter((task) => task.status === "done").length;

    return { total, done, overdue, completionRate, velocity };
  }, [tasks]);

  const trendData = useMemo(() => {
    const days = Array.from({ length: 7 }).map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));
      const iso = date.toISOString().slice(0, 10);

      const dueCount = tasks.filter((task) => task.dueDate === iso).length;
      const doneCount = tasks.filter(
        (task) => task.dueDate === iso && task.status === "done",
      ).length;
      return {
        date: iso.slice(5),
        due: dueCount,
        done: doneCount,
      };
    });

    return days;
  }, [tasks]);

  return (
    <section className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{metrics.completionRate.toFixed(1)}%</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Overdue Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{metrics.overdue}</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Team Velocity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{metrics.velocity}</p>
            <p className="text-xs text-slate-500">Completed tasks</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Load / Employee</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {employees.length ? (metrics.total / employees.length).toFixed(1) : "0.0"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-base">7-Day Due vs Done Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(148 163 184 / 0.25)" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="due" stroke="#2563eb" strokeWidth={2} />
                <Line type="monotone" dataKey="done" stroke="#22c55e" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
