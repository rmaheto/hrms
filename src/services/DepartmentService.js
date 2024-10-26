import authService from "./AuthService";

const API_BASE_URL = "http://localhost:8080/api/departments";

const getHeaders = () => {
  const token = authService.getToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Fetch department by ID
const fetchDepartmentById = async (departmentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${departmentId}`, {
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch department");
    return await response.json();
  } catch (error) {
    console.error("Error fetching department:", error);
    throw error;
  }
};

// Fetch all departments with optional pagination params
const fetchDepartments = async (page = 0, size = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}?page=${page}&size=${size}`, {
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch departments");
    return await response.json();
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

// Update department
const updateDepartment = async (department) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${department.id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(department),
    });
    if (!response.ok) throw new Error("Failed to update department");
    return await response.json();
  } catch (error) {
    console.error("Error updating department:", error);
    throw error;
  }
};

// Add new department
const addDepartment = async (department) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(department),
    });
    if (!response.ok) throw new Error("Failed to add department");
    return await response.json();
  } catch (error) {
    console.error("Error adding department:", error);
    throw error;
  }
};

// Delete department
const deleteDepartment = async (departmentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${departmentId}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete department");
    return true;
  } catch (error) {
    console.error("Error deleting department:", error);
    throw error;
  }
};

export default {
  fetchDepartments,
  updateDepartment,
  addDepartment,
  deleteDepartment,
  fetchDepartmentById,
};


// import authService from "./AuthService";

// const API_BASE_URL = "http://localhost:8080/api/departments";

// const getHeaders = () => {
//   const token = authService.getToken();
//   return {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   };
// };

// // Fetch all departments
// const fetchDepartments = async () => {
//   try {
//     const response = await fetch(API_BASE_URL, {
//       headers: getHeaders(),
//     });
//     if (!response.ok) throw new Error("Failed to fetch departments");
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching departments:", error);
//     throw error;
//   }
// };

// export default { fetchDepartments };
