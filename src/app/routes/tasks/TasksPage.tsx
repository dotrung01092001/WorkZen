import AddButton from "@/components/ui/AddButton";
import TaskModal from "@/components/ui/TaskModal";
import TaskTable2 from "@/features/tasks/components/TaskTable2";
import type { Task } from "@/types/task";
import { useState } from "react";

export default function TasksPage() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const onAdd = () => {
    setEditingTask(null);
    setIsOpenModal(true);
  };

  return (
    <div className="h-[85vh] w-full rounded-xl p-5 bg-white dark:bg-black text-black dark:text-white">
      <h1 className="text-2xl font-semibold mb-6">Tasks</h1>

      <AddButton title="Add Tasks" onAdd={onAdd} />

      <TaskTable2 setIsOpenModal={setIsOpenModal} setEditingTask={setEditingTask} />

      {isOpenModal && (
        <div
          className="fixed inset-0 z-9998 bg-black/90"
          onClick={() => setIsOpenModal(false)}
        ></div>
      )}

      {isOpenModal && (
        <div className="fixed right-80 top-10 z-9999 flex justify-center items-center">
          <div onClick={(e) => e.stopPropagation()}>
            <TaskModal setIsOpenModal={setIsOpenModal} editingTask={editingTask} />
          </div>
        </div>
      )}
    </div>
  );
}
