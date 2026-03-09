import { describe, expect, it } from "vitest";
import { filterTasksByRole } from "../src/utils/filterTasksByRole";
import type { Task } from "../src/types/task";
import type { AuthUser } from "../src/types/auth";

const tasks: Task[] = [
  {
    id: "1",
    title: "Task A",
    assignee: "emp-1",
    status: "todo",
    priority: "Medium",
    dueDate: "2026-03-10",
    createdAt: "2026-03-01",
  },
  {
    id: "2",
    title: "Task B",
    assignee: "emp-2",
    status: "in_progress",
    priority: "High",
    dueDate: "2026-03-12",
    createdAt: "2026-03-01",
  },
];

describe("filterTasksByRole", () => {
  it("returns only own tasks for employee", () => {
    const employee: AuthUser = {
      id: "emp-1",
      email: "e1@test.com",
      name: "Employee 1",
      role: "Employee",
    };
    expect(filterTasksByRole(tasks, employee)).toHaveLength(1);
  });
});
