import API from "./api";

export const getpayments = async () => {
  try {
    const response = await API.get(`/payments`);
    return response.data
  } catch (e) {
    throw e;
  }
};

export const getRecords = async (data) => {
  try {
    const response = await API.get(`/record/${data}`);
    return response.data
  } catch (e) {
    throw e;
  }
};

export const createRecord = async (data) => {
  try {
    const response = await API.post(`/record`, data);
    return response.data
  } catch (e) {
    throw e;
  }
};
