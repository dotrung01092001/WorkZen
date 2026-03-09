import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTaskViewStore } from "@/store/useTaskViewStore";
import { useEmployee } from "@/contexts/EmployeeContext";

export default function TaskAdvancedFilters() {
  const { employees } = useEmployee();
  const [viewName, setViewName] = useState("");
  const {
    mode,
    filters,
    savedViews,
    setMode,
    setFilter,
    resetFilters,
    saveCurrentView,
    applySavedView,
    removeSavedView,
  } = useTaskViewStore();

  const hasActiveFilters = useMemo(() => {
    return (
      filters.status !== "all" ||
      filters.priority !== "all" ||
      filters.assignee !== "all" ||
      Boolean(filters.dateFrom) ||
      Boolean(filters.dateTo)
    );
  }, [filters]);

  return (
    <section className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          Advanced Filters
        </h2>

        <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900">
          <button
            type="button"
            className={`rounded-md px-3 py-1.5 text-sm ${
              mode === "table"
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                : "text-slate-600 dark:text-slate-300"
            }`}
            onClick={() => setMode("table")}
          >
            Table
          </button>
          <button
            type="button"
            className={`rounded-md px-3 py-1.5 text-sm ${
              mode === "kanban"
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                : "text-slate-600 dark:text-slate-300"
            }`}
            onClick={() => setMode("kanban")}
          >
            Kanban
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <select
          className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
          value={filters.status}
          onChange={(event) => setFilter("status", event.target.value as typeof filters.status)}
        >
          <option value="all">All status</option>
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>

        <select
          className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
          value={filters.priority}
          onChange={(event) =>
            setFilter("priority", event.target.value as typeof filters.priority)
          }
        >
          <option value="all">All priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
          value={filters.assignee}
          onChange={(event) =>
            setFilter("assignee", event.target.value as typeof filters.assignee)
          }
        >
          <option value="all">All assignees</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
          value={filters.dateFrom}
          onChange={(event) => setFilter("dateFrom", event.target.value)}
        />
        <input
          type="date"
          className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
          value={filters.dateTo}
          onChange={(event) => setFilter("dateTo", event.target.value)}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <input
          type="text"
          value={viewName}
          onChange={(event) => setViewName(event.target.value)}
          placeholder="Saved view name"
          className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            saveCurrentView(viewName);
            setViewName("");
          }}
        >
          Save View
        </Button>
        <Button type="button" variant="outline" onClick={resetFilters} disabled={!hasActiveFilters}>
          Reset
        </Button>
      </div>

      {savedViews.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {savedViews.map((view) => (
            <div
              key={view.id}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs dark:border-slate-700 dark:bg-slate-900"
            >
              <button
                type="button"
                className="text-slate-700 dark:text-slate-200"
                onClick={() => applySavedView(view.id)}
              >
                {view.name}
              </button>
              <button
                type="button"
                className="text-slate-400 hover:text-rose-500"
                onClick={() => removeSavedView(view.id)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
