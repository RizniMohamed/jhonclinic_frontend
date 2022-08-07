import API from "./api";

export const loginUser = async (data) => {
  try {
    const response = await API.post("/login", data);
    return response.data
  } catch (e) {
    throw e;
  }
};

export const singupUser = async (data) => {
  try {
    const response = await API.post("/user/signup", data);
    return response.data
  } catch (e) {
    throw e;
  }
};

export const getUser_FP = async (data) => {
  try {
    const response = await API.get(`/user/fp/${data}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const updatePassword_FP = async (data) => {
  try {
    const response = await API.patch(`/user/fp/${data.userID}`, data);
    return response.data;
  } catch (e) {
    throw e;
  }
};