import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import EmployeesPage from "./components/Employees/EmployeesPage";
import UserList from "./components/Users/UserList";
import Layout from "./components/GlobalComponents/Layout";
import Login from "./components/Login/Login";
import AttendancePage from "./components/Attendance/AttendancePage";
import NotificationTemplatesPage from "./components/Notification/NotificationTemplatesPage";
import DepartmentPage from "./components/Department/DepartmentPage";
import authService from "./services/AuthService";

const App = () => {
  const isAuthenticated = authService.isLoggedIn();

  return (
      <Router>
        <Routes>
          {/* Authentication check and layout wrapper */}
          <Route
              path="/"
              element={isAuthenticated ? <Layout /> : <Navigate to="/login" replace />}
          >
            {/* Routes within the Layout */}
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UserList />} />
            <Route path="employees" element={<EmployeesPage />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="departments" element={<DepartmentPage />} />
            <Route path="notifications/templates" element={<NotificationTemplatesPage />} />
          </Route>

          {/* Public login route */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
  );
};

export default App;