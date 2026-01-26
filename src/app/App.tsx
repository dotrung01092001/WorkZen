import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";

import DashboardPage from "./routes/dashboard/DashboardPage";
import EmployeesPage from "./routes/employees/EmployeesPage";
import TasksPage from "./routes/tasks/TasksPage";
import SettingsPage from "./routes/settings/SettingsPage";
import { useState } from "react";

export function App() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleOpen: ()=> void = () => {
    setIsOpen(!isOpen)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout isOpen={isOpen} handleOpen={handleOpen} />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
