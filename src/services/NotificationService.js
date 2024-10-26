import authService from "./AuthService";

const API_BASE_URL = "http://localhost:8080/api/notifications";

// Helper to get the authorization headers
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

// Send a notification
const sendNotification = async (notificationRequest) => {
  try {
    const response = await fetch(`${API_BASE_URL}/send`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(notificationRequest),
    });

    if (!response.ok) {
      throw new Error("Failed to send notification");
    }

    const result = await response.json();
    return result.data;  // Access the data field from the ApiResponse
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
};

// Save a new template
const saveTemplate = async (template) => {
  try {
    const response = await fetch(`${API_BASE_URL}/templates`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(template),
    });

    if (!response.ok) {
      throw new Error("Failed to save template");
    }

    const result = await response.json();
    return result.data;  // Access the data field from the ApiResponse
  } catch (error) {
    console.error("Error saving template:", error);
    throw error;
  }
};

// Update an existing template
const updateTemplate = async (templateId, updatedTemplate) => {
  try {
    const response = await fetch(`${API_BASE_URL}/templates/${templateId}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(updatedTemplate),
    });

    if (!response.ok) {
      throw new Error("Failed to update template");
    }

    const result = await response.json();
    return result.data;  // Access the data field from the ApiResponse
  } catch (error) {
    console.error("Error updating template:", error);
    throw error;
  }
};

// Fetch all templates
const fetchTemplates = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/templates`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch templates");
    }

    const result = await response.json();
    return result.data;  // Access the data field from the ApiResponse
  } catch (error) {
    console.error("Error fetching templates:", error);
    throw error;
  }
};

// Fetch a single template by ID
const fetchTemplateById = async (templateId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/templates/${templateId}`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch template with ID ${templateId}`);
    }

    const result = await response.json();
    return result.data;  // Access the data field from the ApiResponse
  } catch (error) {
    console.error(`Error fetching template with ID ${templateId}:`, error);
    throw error;
  }
};

// Fetch message types
const fetchMessageTypes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/message-types`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch message types");
    }

    const result = await response.json();
    return result.data;  // Access the data field from the ApiResponse
  } catch (error) {
    console.error("Error fetching message types:", error);
    throw error;
  }
};

export default {
  sendNotification,
  saveTemplate,
  updateTemplate,
  fetchTemplates,
  fetchTemplateById,
  fetchMessageTypes,
};