import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import ProtectedRoute from "@/components/commons/ProtectedRoute";

import DashboardPage from "./routes/dashboard/DashboardPage";
import EmployeesPage from "./routes/employees/EmployeesPage";
import TasksPage from "./routes/tasks/TasksPage";
import SettingsPage from "./routes/settings/SettingsPage";

import { useCallback, useState } from "react";
import { LoginPage } from "./routes/login/LoginPage";
import ProfilePage from "./routes/profile/ProfilePage";
import { RoleGuard } from "@/components/commons/RoleGuard";

export function App() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout isOpen={isOpen} handleOpen={handleOpen} />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/employees"
            element={
              <RoleGuard allow={["Admin", "Manager"]}>
                <EmployeesPage />
              </RoleGuard>
            }
          />
          <Route path="/tasks" element={<TasksPage />} />
          <Route
            path="/settings"
            element={<SettingsPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
