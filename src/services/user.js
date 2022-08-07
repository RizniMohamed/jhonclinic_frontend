import API from "./api";

export const loginUser = async (data) => {
  try {
    const response = await API.post("/login", data);
    return response.data
  } catch (e) {
    throw e;
  }
};

export const getUsers = async (id) => {
  try {
    const response = await API.get(`/user/${id}`);
    return response.data
  } catch (e) {
    throw e;
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await API.put(`/user/${data.get('userID')}`, data);
    return response.data
  } catch (e) {
    throw e;
  }
};

export const deleteUser = async (data) => {
  try {
    const response = await API.delete(`/user/${data.userID}`);
    return response.data
  } catch (e) {
    throw e;
  }
};



export const createProfile = async (data) => {
  try {
    const response = await API.post(`/user`, data);
    return response.data
  } catch (e) {
    throw e;
  }
};