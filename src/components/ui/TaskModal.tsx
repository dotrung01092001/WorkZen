"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { type Priority, type TaskStatus } from "@/types/common";
import AssigneeInput from "./AssigneeInput";
import { useTask } from "@/contexts/TaskContext";
import type { Task } from "@/types/task";
import type { Employee } from "@/types/employee";
import { useEmployee } from "@/contexts/EmployeeContext";
import { motion } from "framer-motion";
import { X, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";

type TaskModalProps = {
  setIsOpenModal: (value: boolean) => void;
  editingTask?: Task | null;
};

type FormValues = {
  title: string;
  description: string;
  assignee: Employee | null;
  priority: Priority;
  dueDate: string;
};

const TaskModal = ({ setIsOpenModal, editingTask }: TaskModalProps) => {
  const { employees } = useEmployee();
  const { addTask, updateTask, setIsUpdated } = useTask();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      assignee: employees[0] ?? null,
      priority: "Low",
      dueDate: "",
    },
  });

  // Prefill form khi edit
  useEffect(() => {
    if (editingTask) {
      const foundEmployee = employees.find(
        (e) => e.id === editingTask.assignee
      );
      reset({
        title: editingTask.title,
        description: editingTask.description,
        assignee: foundEmployee ?? null,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate,
      });
    }
  }, [editingTask, employees, reset]);

  const onSubmit = (data: FormValues) => {
    const payload: Task = {
      id: editingTask?.id || crypto.randomUUID(),
      title: data.title,
      description: data.description,
      priority: data.priority,
      assignee: data.assignee?.id ?? null,
      dueDate: data.dueDate,
      status: editingTask?.status ?? ("todo" as TaskStatus),
      createdAt: editingTask?.createdAt ?? new Date().toISOString(),
      attachments: editingTask?.attachments ?? [],
      timeline: editingTask?.timeline ?? [],
    };

    if (editingTask) {
      updateTask(payload);
    } else {
      addTask(payload);
    }

    setIsOpenModal(false);
    setIsUpdated(true);
    setTimeout(() => setIsUpdated(false), 2500);
  };

  return (
    <motion.div
      className="relative w-[min(760px,95vw)] overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:p-7"
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.96 }}
      transition={{ duration: 0.22 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.10),transparent_45%)]" />

      <div className="relative mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700 dark:border-cyan-900/60 dark:bg-cyan-950/30 dark:text-cyan-300">
            <ClipboardList className="h-3.5 w-3.5" />
            Task Form
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {editingTask ? "Edit Task" : "Create New Task"}
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Fill all required fields before saving.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpenModal(false)}
          className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <form className="relative space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Title
            </label>
            <input
              type="text"
              placeholder="Type task title"
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-rose-500">{errors.title.message}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Description
            </label>
            <input
              type="text"
              placeholder="Type task description"
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-rose-500">{errors.description.message}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Assignee
            </label>
            <Controller
              control={control}
              name="assignee"
              render={({ field }) => (
                <AssigneeInput value={field.value} onChange={field.onChange} />
              )}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Priority
            </label>
            <select
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
              {...register("priority")}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Due Date
            </label>
            <input
              type="date"
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
              {...register("dueDate")}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-slate-200 pt-4 dark:border-slate-700">
          <Button type="button" variant="outline" onClick={() => setIsOpenModal(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white hover:brightness-110"
          >
            {editingTask ? "Save Changes" : "Create Task"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default TaskModal;
