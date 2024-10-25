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

    return await response.json();
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
};

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

    return await response.json();
  } catch (error) {
    console.error("Error saving template:", error);
    throw error;
  }
};

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

    return await response.json();
  } catch (error) {
    console.error("Error updating template:", error);
    throw error;
  }
};

const fetchMessageTypes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/message-types`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch message types");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching message types:", error);
    throw error;
  }
};

export default {
  sendNotification,
  saveTemplate,
  updateTemplate,
  fetchMessageTypes,
};