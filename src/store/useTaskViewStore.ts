import { create } from "zustand";
import type { Priority, TaskStatus } from "@/types/common";

export type TaskViewMode = "table" | "kanban";

export type TaskFilters = {
  status: TaskStatus | "all";
  priority: Priority | "all";
  assignee: string | "all";
  dateFrom: string;
  dateTo: string;
};

type SavedTaskView = {
  id: string;
  name: string;
  filters: TaskFilters;
};

type TaskViewState = {
  mode: TaskViewMode;
  filters: TaskFilters;
  savedViews: SavedTaskView[];
  setMode: (mode: TaskViewMode) => void;
  setFilter: <K extends keyof TaskFilters>(key: K, value: TaskFilters[K]) => void;
  resetFilters: () => void;
  saveCurrentView: (name: string) => void;
  applySavedView: (id: string) => void;
  removeSavedView: (id: string) => void;
};

const STORAGE_KEY = "task_saved_views";

const defaultFilters: TaskFilters = {
  status: "all",
  priority: "all",
  assignee: "all",
  dateFrom: "",
  dateTo: "",
};

const loadSavedViews = (): SavedTaskView[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedTaskView[];
  } catch {
    return [];
  }
};

export const useTaskViewStore = create<TaskViewState>((set, get) => ({
  mode: "table",
  filters: defaultFilters,
  savedViews: typeof window !== "undefined" ? loadSavedViews() : [],

  setMode: (mode) => set({ mode }),
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  resetFilters: () => set({ filters: defaultFilters }),

  saveCurrentView: (name) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const next = [
      ...get().savedViews,
      {
        id: crypto.randomUUID(),
        name: trimmed,
        filters: get().filters,
      },
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    set({ savedViews: next });
  },

  applySavedView: (id) => {
    const found = get().savedViews.find((view) => view.id === id);
    if (!found) return;
    set({ filters: found.filters });
  },

  removeSavedView: (id) => {
    const next = get().savedViews.filter((view) => view.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    set({ savedViews: next });
  },
}));
