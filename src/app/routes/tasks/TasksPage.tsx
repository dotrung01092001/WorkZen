import AddButton from "@/components/ui/AddButton";
import TaskModal from "@/components/ui/TaskModal";
import TaskTable2 from "@/features/tasks/components/TaskTable2";
import type { Task } from "@/types/task";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Popup from "@/components/ui/Popup";
import { useTask } from "@/contexts/TaskContext";
import Dialog from "@/components/ui/Dialog";
import TaskAdvancedFilters from "@/features/tasks/components/TaskAdvancedFilters";
import TaskKanbanBoard from "@/features/tasks/components/TaskKanbanBoard";
import { useTaskViewStore } from "@/store/useTaskViewStore";
import { filterTasksAdvanced } from "@/utils/filterTasksAdvanced";
import { useAuth } from "@/hooks/useAuth";
import TaskActivityPanel from "@/features/tasks/components/TaskActivityPanel";

export default function TasksPage() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activityTaskId, setActivityTaskId] = useState<string>("");
  const { user } = useAuth();
  const { tasks, isAdded, isOpenDialog, handleCloseDialog2, isUpdated } = useTask();
  const { mode, filters } = useTaskViewStore();

  const filteredTasks = useMemo(() => {
    return filterTasksAdvanced(tasks, filters);
  }, [filters, tasks]);

  const onAdd = () => {
    setEditingTask(null);
    setIsOpenModal(true);
  };

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>

      {user?.role !== "Employee" && <AddButton title="Add Tasks" onAdd={onAdd} />}

      <TaskAdvancedFilters />

      {mode === "kanban" ? (
        <TaskKanbanBoard tasks={filteredTasks} />
      ) : (
        <TaskTable2
          setIsOpenModal={setIsOpenModal}
          setEditingTask={setEditingTask}
          tasksOverride={filteredTasks}
          onOpenActivity={setActivityTaskId}
        />
      )}

      {activityTaskId && <TaskActivityPanel taskId={activityTaskId} />}

      {user?.role !== "Employee" && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Real-time sync is enabled across browser tabs for task updates.
        </p>
      )}
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
              className="absolute inset-0 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpenModal(false)}
            />

            {/* Modal */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.2 }}
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
            transition={{ duration: 0.2 }}
            className="fixed right-4 top-20 z-50"
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
            transition={{ duration: 0.2 }}
            className="fixed right-4 top-20 z-50"
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
              className="absolute inset-0 bg-black/60"
              onClick={() => handleCloseDialog2()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Dialog />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
