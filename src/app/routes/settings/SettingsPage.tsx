import EmployeeModal from "@/components/ui/EmployeeModal";
import { useEmployee } from "../../../contexts/EmployeeContext";
import { EmployeeTable4 } from "@/features/employees/components/EmployeeTable4";
import type { Employee } from "@/types/employee";
import { useState } from "react";
import AddButton from "@/components/ui/AddButton";
import Popup from "@/components/ui/Popup";
import { motion, AnimatePresence } from "framer-motion";
import Dialog from "@/components/ui/Dialog";

export default function SettingsPage() {
  const employeeState = useEmployee();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const { isAdded, isOpenDialog, handleCloseDialog, isUpdated } = useEmployee();

  const onEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsOpenModal(true);
  };

  const onAdd = () => {
    setEditingEmployee(null);
    setIsOpenModal(true);
  };

  return (
    <div className="relative h-[85vh] w-full rounded-xl bg-[#bcceeb] dark:bg-[#00296b] text-black dark:text-white overflow-hidden">
      <div className="p-5 h-full overflow-auto">
        <h1 className="text-2xl font-semibold mb-4">Settings</h1>

        <AddButton onAdd={onAdd} title="Add Employee" />

        <EmployeeTable4 onEdit={onEdit} employeeState={employeeState} />
      </div>

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
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                duration: 0.3,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <EmployeeModal
                setIsOpenModal={setIsOpenModal}
                employee={editingEmployee}
                employeeState={employeeState}
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
            <Popup message="Employee added successfully!" />
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
            <Popup message="Employee updated successfully!" />
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
              onClick={() => handleCloseDialog()}
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
