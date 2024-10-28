import authService from "./AuthService";

const API_BASE_URL = "http://localhost:8080/api/departments";

const getHeaders = () => {
  const token = authService.getToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Fetch all departments
const fetchDepartments = async () => {
  try {
    const response = await fetch(API_BASE_URL, {
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch departments");
    return await response.json();
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

// Fetch a department by ID
const fetchDepartmentById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error(`Failed to fetch department with ID ${id}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching department by ID ${id}:`, error);
    throw error;
  }
};

// Fetch a department by code
const fetchDepartmentByCode = async (code) => {
  try {
    const response = await fetch(`${API_BASE_URL}/code/${code}`, {
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error(`Failed to fetch department with code ${code}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching department by code ${code}:`, error);
    throw error;
  }
};

// Create a new department
const createDepartment = async (departmentData) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(departmentData),
    });
    if (!response.ok) throw new Error("Failed to create department");
    return await response.json();
  } catch (error) {
    console.error("Error creating department:", error);
    throw error;
  }
};

// Update an existing department
const updateDepartment = async (id, departmentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(departmentData),
    });
    if (!response.ok) throw new Error(`Failed to update department with ID ${id}`);
    return await response.json();
  } catch (error) {
    console.error(`Error updating department with ID ${id}:`, error);
    throw error;
  }
};

// Delete a department
const deleteDepartment = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error(`Failed to delete department with ID ${id}`);
  } catch (error) {
    console.error(`Error deleting department with ID ${id}:`, error);
    throw error;
  }
};

// Export all methods as part of departmentService
export default {
  fetchDepartments,
  fetchDepartmentById,
  fetchDepartmentByCode,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};