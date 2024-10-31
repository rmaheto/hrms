import authService from "./AuthService";

const API_BASE_URL = "http://localhost:8080/api/benefits";

// Helper to get authorization headers
const getHeaders = () => {
  const token = authService.getToken();
  if (!token) {
    throw new Error("No authentication token found");
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

/**
 * Assign benefits to an employee
 * @param {Number} employeeId - The ID of the employee
 * @param {Array<Number>} benefitPlanIds - List of benefit plan IDs to assign
 * @returns {Promise<ApiResponse>}
 */
const assignBenefits = async (employeeId, benefitPlanIds) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${employeeId}/assign?${new URLSearchParams({ benefitPlanIds }).toString()}`, {
      method: "POST",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to assign benefits to employee");
    }

    return await response.json();
  } catch (error) {
    console.error("Error assigning benefits:", error);
    throw error;
  }
};

/**
 * Update an employee benefit record
 * @param {Number} benefitId - The ID of the benefit record
 * @param {Object} updatedBenefitData - The updated benefit data
 * @returns {Promise<ApiResponse>}
 */
const updateEmployeeBenefit = async (benefitId, updatedBenefitData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${benefitId}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(updatedBenefitData),
    });

    if (!response.ok) {
      throw new Error("Failed to update employee benefit");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating employee benefit:", error);
    throw error;
  }
};

/**
 * Get all benefits assigned to an employee
 * @param {Number} employeeId - The ID of the employee
 * @returns {Promise<ApiResponse>}
 */
const getEmployeeBenefits = async (employeeId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/employee/${employeeId}`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch employee benefits");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching employee benefits:", error);
    throw error;
  }
};

export default {
  assignBenefits,
  updateEmployeeBenefit,
  getEmployeeBenefits,
};