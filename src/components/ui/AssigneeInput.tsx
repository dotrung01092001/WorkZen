import { useEffect, useMemo, useRef, useState } from "react";
import { useEmployee } from "@/contexts/EmployeeContext";
import type { Employee } from "@/types/employee";

type AssigneeInputProps = {
  value: Employee | null;
  onChange: (employee: Employee) => void;
};

const AssigneeInput = ({ value, onChange }: AssigneeInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const { employees } = useEmployee();

  const filteredAssignees = useMemo(
    () =>
      employees.filter((employee) =>
        employee.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [employees, query],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (employee: Employee) => {
    onChange(employee);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        type="text"
        value={isOpen ? query : (value?.name ?? query)}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          setQuery(value?.name ?? "");
          setIsOpen(true);
        }}
        placeholder="Choose assignee"
        className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
      />

      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-lg border border-slate-200 bg-white p-1 shadow-md dark:border-slate-700 dark:bg-slate-900">
          {filteredAssignees.length === 0 ? (
            <li className="p-2 text-sm text-slate-500 dark:text-slate-400">
              No assignees found
            </li>
          ) : (
            filteredAssignees.map((employee) => (
              <li
                key={employee.id}
                onClick={() => handleSelect(employee)}
                className="cursor-pointer rounded-md p-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {employee.name}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default AssigneeInput;
