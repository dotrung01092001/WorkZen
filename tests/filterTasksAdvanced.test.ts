import { describe, expect, it } from "vitest";
import { filterTasksAdvanced } from "../src/utils/filterTasksAdvanced";
import type { Task } from "../src/types/task";

const tasks: Task[] = [
  {
    id: "1",
    title: "Build login",
    assignee: "e1",
    status: "todo",
    priority: "High",
    dueDate: "2026-03-10",
    createdAt: "2026-03-01",
  },
  {
    id: "2",
    title: "Fix chart",
    assignee: "e2",
    status: "done",
    priority: "Low",
    dueDate: "2026-03-15",
    createdAt: "2026-03-01",
  },
];

describe("filterTasksAdvanced", () => {
  it("filters by status and assignee", () => {
    const result = filterTasksAdvanced(tasks, {
      status: "todo",
      priority: "all",
      assignee: "e1",
      dateFrom: "",
      dateTo: "",
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });
});
