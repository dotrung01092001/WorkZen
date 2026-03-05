"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { type Priority, type TaskStatus } from "@/types/common";
import AssigneeInput from "./AssigneeInput";
import SaveButton from "./SaveButton";
import { useTask } from "@/contexts/TaskContext";
import type { Task } from "@/types/task";
import type { Employee } from "@/types/employee";
import { useEmployee } from "@/contexts/EmployeeContext";
import { motion } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";

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
      status: "todo" as TaskStatus,
      createdAt: editingTask?.createdAt ?? new Date().toISOString(),
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
      className="relative bg-white dark:bg-gray-800 p-10 w-130 rounded-xl max-md:w-full"
      initial={{ opacity: 0, y: 200, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 200 }}
      transition={{ duration: 1, type: "spring", stiffness: 100 }}
    >
      <h1 className="text-center font-semibold text-xl mb-4">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h1>

      <button
        onClick={() => setIsOpenModal(false)}
        className="absolute top-5 right-2 px-2 py-2 rounded-md bg-[#de0a0a] hover:bg-red-400 font-semibold cursor-pointer"
      >
        <MdOutlineClose />
      </button>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            placeholder="Type title"
            className="mt-1 w-full border rounded px-3 py-2"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            type="text"
            placeholder="Type description"
            className="mt-1 w-full border rounded px-3 py-2"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Assignee */}
        <div>
          <label className="block text-sm font-medium mb-1">Assignee</label>
          <Controller
            control={control}
            name="assignee"
            render={({ field }) => (
              <AssigneeInput value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            className="mt-1 border rounded px-3 py-2 w-full"
            {...register("priority")}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input
            type="date"
            className="mt-1 w-full border rounded px-3 py-2"
            {...register("dueDate")}
          />
        </div>

        <SaveButton />
      </form>
    </motion.div>
  );
};

export default TaskModal;