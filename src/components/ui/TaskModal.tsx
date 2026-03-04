import { useEffect, useState } from "react";
import { type Priority, type TaskStatus } from "@/types/common";
import AssigneeInput from "./AssigneeInput";
import SaveButton from "./SaveButton";
import { useTask } from "@/contexts/TaskContext";
import type { Task } from "@/types/task";
import type { Employee } from "@/types/employee";
import { useEmployee } from "@/contexts/EmployeeContext";
import { motion } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";

const TaskModal = ({ setIsOpenModal, editingTask } : {setIsOpenModal: (value: boolean) => void, editingTask: Task }) => {
  const { employees } = useEmployee();
  const { addTask, updateTask, setIsUpdated } = useTask();
  const [assignee, setAssignee] = useState<Employee | null>(null);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("Low");
  const [dueDate, setDueDate] = useState<string>("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate);
      const foundEmployee = employees.find(
        (e) => e.id === editingTask.assignee,
      );

      setAssignee(foundEmployee ?? null);
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: Task = {
      id: editingTask ? editingTask.id : crypto.randomUUID(),
      title,
      description,
      priority,
      assignee: assignee ? assignee.id : null,
      dueDate,
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
      className="relative bg-white dark:bg-gray-800 p-10 w-130"
      initial={{ opacity: 0, y: 200, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 200 }}
      transition={{ duration: 1, type: "spring", stiffness: 100 }}
    >
      <h1 className="text-center font-semibold text-xl">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h1>
      <button
        onClick={() => setIsOpenModal(false)}
        className="absolute top-2 right-2 px-2 py-2 rounded-md bg-[#de0a0a] hover:bg-red-400 font-semibold cursor-pointer"
      >
        <MdOutlineClose />
      </button>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          placeholder="Type Name"
          className="mt-1 w-full border rounded px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="block text-sm font-medium mb-1">Description</label>
        <input
          type="text"
          placeholder="Type Name"
          className="mt-1 w-full border rounded px-3 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className="block text-sm font-medium mb-1">Assignee</label>
        <div className="mt-1">
          <AssigneeInput value={assignee} onChange={setAssignee} />
        </div>
        <label className="block text-sm font-medium my-1">Role</label>
        <select
          className="mt-1 border rounded px-3 py-2 w-full"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option className="dark:text-black">Low</option>
          <option className="dark:text-black">Medium</option>
          <option className="dark:text-black">High</option>
        </select>
        <label className="block text-sm font-medium my-1">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="mt-1 w-full border rounded px-3 py-2"
        />

        <SaveButton />
      </form>
    </motion.div>
  );
};

export default TaskModal;
