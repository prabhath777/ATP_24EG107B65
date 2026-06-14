import api from "./api";

export const registerUserApi = async (userData) => {
  const response = await api.post("/auth/register-user", userData);
  return response.data;
};

export const loginUserApi = async (credentials) => {
  const response = await api.post("/auth/login-user", credentials);
  return response.data;
};

export const registerOrgApi = async (orgData) => {
  const response = await api.post("/auth/register-org", orgData);
  return response.data;
};

export const loginOrgApi = async (credentials) => {
  const response = await api.post("/auth/login-org", credentials);
  return response.data;
};

export const logoutApi = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getMeApi = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
