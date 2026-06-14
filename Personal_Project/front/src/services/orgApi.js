import api from "./api";

export const getPublicStockApi = async () => {
  const response = await api.get("/org/stock");
  return response.data;
};

export const updateStockApi = async (stockData) => {
  const response = await api.put("/org/stock", stockData);
  return response.data;
};

export const updateOrgProfileApi = async (profileData) => {
  const response = await api.put("/org/profile", profileData);
  return response.data;
};
