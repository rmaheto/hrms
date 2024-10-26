import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.js";
import EmployeesPage from "./components/Employees/EmployeesPage";
import UserList from "./components/Users/UserList.js";
import Layout from "./components/Layout";
import Login from "./components/Login/Login.js";
import authService from "./services/AuthService";
import AttendancePage from "./components/Attendance/AttendancePage";
import NotificationTemplatesPage from "./components/Notification/NotificationTemplatesPage"

const App = () => {
  const isAuthenticated = authService.isLoggedIn();

  return (
    <Router>
      <Routes>
        {/* Wrap both the dashboard and users page with the Layout */}
        <Route
          path="/"
          element={!isAuthenticated ? <Navigate to="/login" /> : <Layout />}
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserList />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="notifications/templates" element={<NotificationTemplatesPage />} />
        </Route>
        <Route path="/login" element={<Login />} />{" "}
        {/* Define the Login route */}
      </Routes>
    </Router>
  );
};

export default App;
