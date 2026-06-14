import api from "./api";

export const createRequestApi = async (requestData) => {
  const response = await api.post("/requests", requestData);
  return response.data;
};

export const getMyRequestsApi = async () => {
  const response = await api.get("/requests/my");
  return response.data;
};

export const getPendingRequestsApi = async () => {
  const response = await api.get("/requests");
  return response.data;
};

export const acceptRequestApi = async (id) => {
  const response = await api.patch(`/requests/${id}/accept`);
  return response.data;
};

export const completeRequestApi = async (id) => {
  const response = await api.patch(`/requests/${id}/complete`);
  return response.data;
};

export const cancelRequestApi = async (id) => {
  const response = await api.patch(`/requests/${id}/cancel`);
  return response.data;
};
