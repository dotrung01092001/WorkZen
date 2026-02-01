import {  useState } from "react";
import { type Priority, type TaskStatus } from "@/types/common";
import AssigneeInput from "./AssigneeInput";
import SaveButton from "./SaveButton";
import { useTask } from "@/contexts/TaskContext";
import type { Task } from "@/types/task";
import type { Employee } from "@/types/employee";

const TaskModal = ({setIsOpenModal}) => {
  const { tasks, addTask } = useTask();
  const [assignee, setAssignee] = useState<Employee | null>(null);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("Low");
  const [dueDate, setDueDate] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      priority,
      assignee: assignee ? assignee.id : null,
      dueDate,
      status: "todo" as TaskStatus,
      createdAt: new Date().toISOString(),
    };

    addTask(payload);

    setIsOpenModal(false);
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 p-10 w-130">
      <h1 className="text-center font-semibold text-xl">Add New Task</h1>
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
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />

        <SaveButton />
      </form>
    </div>
  );
};

export default TaskModal;
