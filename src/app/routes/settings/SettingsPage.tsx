import EmployeeModal from "@/components/ui/EmployeeModal";
import { useEmployee } from '../../../contexts/EmployeeContext';
import { EmployeeTable4 } from "@/features/employees/components/EmployeeTable4";
import type { Employee } from "@/types/employee";
import { useState } from "react";
import AddButton from "@/components/ui/AddButton";

export default function SettingsPage() {
  const employeeState = useEmployee();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const onEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsOpenModal(true);  
  };

  const onAdd = () => {
    setEditingEmployee(null); // add mới
    setIsOpenModal(true);
  };

  const onDelete = (employee: Employee) => {
    employeeState.removeEmployee(employee.id);
  }

  return (
    <div className="relative h-[85vh] w-full rounded-xl bg-[#bcceeb] dark:bg-[#00296b] text-black dark:text-white overflow-hidden">
      <div className="p-5 h-full overflow-auto">
        <h1 className="text-2xl font-semibold mb-4">Settings</h1>

        <AddButton onAdd={onAdd} title="Add Employee" />

        <EmployeeTable4 onEdit={onEdit} employeeState={employeeState} onDelete={onDelete} />
      </div>


      {isOpenModal && (
        <div
          className="fixed inset-0 bg-black/90 z-9998"
          onClick={() => setIsOpenModal(false)}
        />
      )}


      {isOpenModal && (
        <div className="fixed top-30 right-100 z-9999 flex items-center justify-center">
          <div onClick={(e) => e.stopPropagation()}>
            <EmployeeModal setIsOpenModal={setIsOpenModal} employee={editingEmployee} employeeState={employeeState} />
          </div>
        </div>
      )}
    </div>
  );
}
