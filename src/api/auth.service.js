import api from "./axios";

/**
 * Registers a new user account.
 * Note: The backend enforces @gmail.com email addresses.
 */
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", {
      name: userData.name ?? userData.username,
      email: userData.email,
      password: userData.password,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to register user:", error);
    throw error;
  }
};

/**
 * Logs a user in with their credentials (email & password).
 * On success, the backend sets an HTTP-only session cookie.
 */
export const loginUser = async (userData) => {
  try {
    const response = await api.post("/auth/login", {
      email: userData.email ?? userData.username,
      password: userData.password,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to login:", error);
    throw error;
  }
};

/**
 * Logs out the active user and clears the session cookie.
 */
export const logoutUser = async () => {
  try {
    const response = await api.post("/auth/logout", {});
    return response.data;
  } catch (error) {
    console.error("Failed to logout:", error);
    throw error;
  }
};

/**
 * Verifies the current session cookie and retrieves user profile details.
 */
export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

