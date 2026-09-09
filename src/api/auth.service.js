import api from "./axios";

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

export const logoutUser = async () => {
  try {
    const response = await api.post("/auth/logout", {});
    return response.data;
  } catch (error) {
    console.error("Failed to logout:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

