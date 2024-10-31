import authService from "./AuthService";

const API_BASE_URL = "http://localhost:8080/api/benefit-plans";

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

const fetchAllBenefitPlans = async () => {
  try {
    const response = await fetch(API_BASE_URL, { headers: getHeaders() });
    if (!response.ok) throw new Error("Failed to fetch benefit plans");
    return await response.json();
  } catch (error) {
    console.error("Error fetching benefit plans:", error);
    throw error;
  }
};

const fetchBenefitPlanById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, { headers: getHeaders() });
    if (!response.ok) throw new Error("Failed to fetch benefit plan by ID");
    return await response.json();
  } catch (error) {
    console.error("Error fetching benefit plan by ID:", error);
    throw error;
  }
};

const createBenefitPlan = async (benefitPlanDto) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(benefitPlanDto),
    });
    if (!response.ok) throw new Error("Failed to create benefit plan");
    return await response.json();
  } catch (error) {
    console.error("Error creating benefit plan:", error);
    throw error;
  }
};

const updateBenefitPlan = async (benefitPlanDto) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${benefitPlanDto.id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(benefitPlanDto),
    });
    if (!response.ok) throw new Error("Failed to update benefit plan");
    return await response.json();
  } catch (error) {
    console.error("Error updating benefit plan:", error);
    throw error;
  }
};

const activateBenefitPlan = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}/activate`, {
      method: "PUT",
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to activate benefit plan");
    return await response.json();
  } catch (error) {
    console.error("Error activating benefit plan:", error);
    throw error;
  }
};

const inactivateBenefitPlan = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}/inactivate`, {
      method: "PUT",
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to inactivate benefit plan");
    return await response.json();
  } catch (error) {
    console.error("Error inactivating benefit plan:", error);
    throw error;
  }
};

export default {
  fetchAllBenefitPlans,
  fetchBenefitPlanById,
  createBenefitPlan,
  updateBenefitPlan,
  activateBenefitPlan,
  inactivateBenefitPlan,
};