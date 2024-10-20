import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/login/Login.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import authService from "./services/AuthService";

const App = () => {
  const isAuthenticated = authService.isLoggedIn();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
