import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TaskAdvancedFilters from "../src/features/tasks/components/TaskAdvancedFilters";

vi.mock("../src/contexts/EmployeeContext", () => ({
  useEmployee: () => ({
    employees: [
      { id: "1", name: "Alice" },
      { id: "2", name: "Bob" },
    ],
  }),
}));

describe("TaskAdvancedFilters", () => {
  it("renders basic controls", () => {
    render(<TaskAdvancedFilters />);
    expect(screen.getByText("Advanced Filters")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Kanban" })).toBeInTheDocument();
  });
});
