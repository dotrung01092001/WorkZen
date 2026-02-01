import { AuthProvider } from "@/contexts/AuthContext";
import { UIProvider } from "@/contexts/UIContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { EmployeeProvider } from "../../contexts/EmployeeContext";
import { TaskProvider } from "@/contexts/TaskContext";

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <UIProvider>
        <ThemeProvider>
          <EmployeeProvider>
            <TaskProvider>{children}</TaskProvider>
          </EmployeeProvider>
        </ThemeProvider>
      </UIProvider>
    </AuthProvider>
  );
}
