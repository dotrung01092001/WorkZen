import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { type Employee } from "@/types/employee";
import type { Role, Status } from "@/types/common";
import { useEmployee } from "@/contexts/EmployeeContext";
import SaveButton from "./SaveButton";

type ModalProps = {
  setIsOpenModal: (value: boolean) => void;
  employee?: Employee | null;
  employeeState: ReturnType<typeof useEmployee>;
};

type FormValues = {
  name: string;
  email: string;
  role: Role;
  status: Status;
};

const EmployeeModal = ({
  setIsOpenModal,
  employee,
  employeeState,
}: ModalProps) => {
  const { addEmployee, updateEmployee } = employeeState;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      role: "Employee",
      status: "Active",
    },
  });

  // Prefill khi edit
  useEffect(() => {
    if (employee) {
      reset({
        name: employee.name,
        email: employee.email,
        role: employee.role,
        status: employee.status,
      });
    }
  }, [employee, reset]);

  const onSubmit = (data: FormValues) => {
    const payload: Employee = {
      id: employee?.id || crypto.randomUUID(),
      ...data,
      password: "",
    };

    if (employee) {
      updateEmployee(payload);
    } else {
      addEmployee(payload);
    }

    setIsOpenModal(false);
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl w-[520px] max-md:w-full shadow-2xl">
      <h1 className="text-center font-semibold text-lg mb-4">
        {employee ? "Edit Employee" : "Add New Employee"}
      </h1>

      <button
        onClick={() => setIsOpenModal(false)}
        className="absolute top-3 right-3 text-sm px-2 py-1 rounded-md bg-red-600 hover:bg-red-500 text-white cursor-pointer"
      >
        ✕
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* NAME */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            {...register("name", {
              required: "Name is required",
            })}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.com$/,
                message: "Email must contain @ and end with .com",
              },
            })}
            className="w-full border rounded px-3 py-2"
            placeholder="example@gmail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* ROLE */}
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            {...register("role")}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>
        </div>

        {/* STATUS */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            {...register("status")}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <SaveButton />
      </form>
    </div>
  );
};

export default EmployeeModal;
