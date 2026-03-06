import AddButton from "@/components/ui/AddButton";
import TaskModal from "@/components/ui/TaskModal";
import TaskTable2 from "@/features/tasks/components/TaskTable2";
import type { Task } from "@/types/task";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Popup from "@/components/ui/Popup";
import { useTask } from "@/contexts/TaskContext";
import Dialog from "@/components/ui/Dialog";

export default function TasksPage() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { isAdded, isOpenDialog, handleCloseDialog2, isUpdated } = useTask();

  const onAdd = () => {
    setEditingTask(null);
    setIsOpenModal(true);
  };

  return (
    <div className="h-[85vh] w-full rounded-xl p-5 bg-[#bcceeb] dark:bg-[#00296b] text-black dark:text-white">
      <h1 className="text-2xl font-semibold mb-6">Tasks</h1>

      <AddButton title="Add Tasks" onAdd={onAdd} />

      <TaskTable2
        setIsOpenModal={setIsOpenModal}
        setEditingTask={setEditingTask}
      />
      <AnimatePresence>
        {isOpenModal && (
          <motion.div
            className="fixed inset-0 z-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpenModal(false)}
            />

            {/* Modal */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 200, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 200, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 1,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <TaskModal
                setIsOpenModal={setIsOpenModal}
                editingTask={editingTask}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAdded && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
            className="fixed top-21.5 right-7 z-9999"
          >
            <Popup message="Task added successfully!" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isUpdated && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
            className="fixed top-21.5 right-7 z-9999"
          >
            <Popup message="Task updated successfully!" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpenDialog && (
          <motion.div
            className="fixed inset-0 z-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/80"
              onClick={() => handleCloseDialog2()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 100, x:150, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, x:0, scale: 1 }}
              exit={{ opacity: 0, y: 100, x:150, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                duration: 0.3,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Dialog />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
