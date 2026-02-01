import { useState, useEffect } from "react";
import { type Employee } from "@/types/employee";
import type { Role, Status } from "@/types/common";
import { useEmployee } from "@/contexts/EmployeeContext";
import SaveButton from "./SaveButton";

type ModalProps = {
  setIsOpenModal: (value: boolean) => void;
  employee?: Employee | null;
  employeeState: ReturnType<typeof useEmployee>; 
};

const EmployeeModal = ({ setIsOpenModal, employee, employeeState }: ModalProps) => {
  const { addEmployee, updateEmployee } = employeeState;

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("employee");
  const [status, setStatus] = useState<Status>("active");

  // prefill form khi edit
  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setEmail(employee.email);
      setRole(employee.role);
      setStatus(employee.status);
    }
  }, [employee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Employee = {
      id: employee?.id || crypto.randomUUID(),
      name,
      email,
      role,
      status,
    };

    if (employee) {
      updateEmployee(payload); // edit
    } else {
      addEmployee(payload); // add
    }

    setIsOpenModal(false);
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg w-130 shadow-lg">
      <h1 className="text-center font-semibold text-lg">
        {employee ? "Edit Employee" : "Add New Employee"}
      </h1>
      <button
        onClick={() => setIsOpenModal(false)}
        className="absolute top-2 right-2 px-2 py-1 rounded-md bg-red-500 hover:bg-red-400 font-semibold cursor-pointer"
      >
        X
      </button>
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          placeholder="Type Name"
          className="mt-1 w-full border rounded px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="block text-sm font-medium my-1">Email</label>
        <input
          type="text"
          placeholder="Type Email"
          className="mt-1 w-full border rounded px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-sm font-medium my-1">Role</label>
        <select
          className="mt-1 border rounded px-3 py-2 w-full"
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
        >
          <option className="dark:text-black">Admin</option>
          <option className="dark:text-black">Manager</option>
          <option className="dark:text-black">Employee</option>
        </select>

        <label className="block text-sm font-medium my-1">Status</label>
        <select
          className="mt-1 border rounded px-3 py-2 w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
        >
          <option className="dark:text-black">Active</option>
          <option className="dark:text-black">Inactive</option>
        </select>

        <SaveButton />
      </form>
    </div>
  );
};

export default EmployeeModal;
