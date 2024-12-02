const API_BASE_URL = "http://localhost:8080/api";

// Fetch user data
export const fetchUserData = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  return response.json();
};

// Update username
export const updateUsername = async (userId, username) => {
  const response = await fetch(`${API_BASE_URL}/update-username`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, username }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update username");
  }

  return response.json();
};

// Update password
export const updatePassword = async (userId, currentPassword, newPassword) => {
  const response = await fetch(`${API_BASE_URL}/update-password`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      currentPassword,
      newPassword,
    }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Current password is incorrect");
    }

    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update password");
  }

  return response.json();
};

// Additional utility functions can be added here
export const isValidUsername = (username) => {
  // Example validation
  return username.trim().length >= 3;
};

export const isValidPassword = (password) => {
  // Example validation
  return password.length >= 8;
};
