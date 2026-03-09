import type { Task } from "@/types/task";
import type { TaskFilters } from "@/store/useTaskViewStore";

export function filterTasksAdvanced(tasks: Task[], filters: TaskFilters) {
  return tasks.filter((task) => {
    if (filters.status !== "all" && task.status !== filters.status) {
      return false;
    }

    if (filters.priority !== "all" && task.priority !== filters.priority) {
      return false;
    }

    if (filters.assignee !== "all" && (task.assignee ?? "") !== filters.assignee) {
      return false;
    }

    if (filters.dateFrom && task.dueDate < filters.dateFrom) {
      return false;
    }

    if (filters.dateTo && task.dueDate > filters.dateTo) {
      return false;
    }

    return true;
  });
}
