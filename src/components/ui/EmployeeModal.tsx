import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { type Employee } from "@/types/employee";
import type { Role, Status } from "@/types/common";
import { useEmployee } from "@/contexts/EmployeeContext";
import { Button } from "@/components/ui/button";
import { UserRoundPlus, X } from "lucide-react";

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
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    setSubmitError(null);

    const payload: Employee = {
      id: employee?.id || crypto.randomUUID(),
      ...data,
      password: "",
    };

    if (employee) {
      updateEmployee(payload);
    } else {
      const result = addEmployee(payload);
      if (!result.ok) {
        setSubmitError("This email already exists. Please use another email.");
        return;
      }
    }

    setIsOpenModal(false);
  };

  return (
    <div className="relative w-[min(680px,95vw)] overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:p-7">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_45%)]" />

      <div className="relative mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-300">
            <UserRoundPlus className="h-3.5 w-3.5" />
            Employee Form
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {employee ? "Edit Employee" : "Add New Employee"}
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage employee profile and access role.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpenModal(false)}
          className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Name
            </label>
            <input
              {...register("name", {
                required: "Name is required",
              })}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.com$/,
                  message: "Email must contain @ and end with .com",
                },
              })}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
              placeholder="example@company.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Role
            </label>
            <select
              {...register("role")}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
            >
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {submitError && (
          <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300">
            {submitError}
          </p>
        )}

        <div className="flex items-center justify-end gap-2 border-t border-slate-200 pt-4 dark:border-slate-700">
          <Button type="button" variant="outline" onClick={() => setIsOpenModal(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white hover:brightness-110"
          >
            {employee ? "Save Changes" : "Create Employee"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeModal;
