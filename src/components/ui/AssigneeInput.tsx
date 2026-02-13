import { useState, useMemo, useRef, useEffect } from "react";
import { useEmployee } from "@/contexts/EmployeeContext";
import type { Employee } from "@/types/employee";

const AssigneeInput = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const { employees } = useEmployee();

  const filteredAssignees = useMemo(() => {
    return employees.filter((employee) =>
      employee.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, employees]);

  // Sync input text when value changes (important)
  useEffect(() => {
    if (value) {
      setQuery(value.name);
    }
  }, [value]);


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
    onChange(employee);        // 🔥 báo lên parent
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="Choose assignee"
        className="w-full rounded border px-3 py-2 dark:text-white"
      />

      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded border bg-white shadow">
          {filteredAssignees.length === 0 ? (
            <li className="p-2 text-sm text-gray-500">
              No assignees found
            </li>
          ) : (
            filteredAssignees.map((employee) => (
              <li
                key={employee.id}
                onClick={() => handleSelect(employee)}
                className="cursor-pointer p-2 hover:bg-blue-500 hover:text-white"
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
