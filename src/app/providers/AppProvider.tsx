import { AuthProvider } from "@/contexts/AuthContext";
import { UIProvider } from "@/contexts/UIContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { EmployeeProvider } from "../../contexts/EmployeeContext";
import { TaskProvider } from "@/contexts/TaskContext";
import type { ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <EmployeeProvider>
        <AuthProvider>
          <UIProvider>
            <TaskProvider>{children}</TaskProvider>
          </UIProvider>
        </AuthProvider>
      </EmployeeProvider>
    </ThemeProvider>
  );
}
