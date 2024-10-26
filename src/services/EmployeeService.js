import authService from "./AuthService";

const API_BASE_URL = "http://localhost:8080/api/employees";

const getHeaders = () => {
  const token = authService.getToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Fetch employee by ID
const fetchEmployeeById = async (employeeId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${employeeId}`, {
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch employee");
    return await response.json();
  } catch (error) {
    console.error("Error fetching employee:", error);
    throw error;
  }
};

// Delete employee by ID
const deleteEmployee = async (employeeId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${employeeId}`, {
      Method:"DELETE",
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete employee");
    return await response.json();
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};


// Fetch all employees with optional pagination params
const fetchEmployees = async (page = 0, size = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}?page=${page}&size=${size}`, {
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch employees");
    return await response.json();
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

// Update employee
const updateEmployee = async (employee) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${employee.id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(employee),
    });
    if (!response.ok) throw new Error("Failed to update employee");
    return await response.json();
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

// Add new employee
const addEmployee = async (employee) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(employee),
    });
    if (!response.ok) throw new Error("Failed to add employee");
    return await response.json();
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};

export default {
  fetchEmployees,
  updateEmployee,
  addEmployee,
  fetchEmployeeById,
  deleteEmployee
};
