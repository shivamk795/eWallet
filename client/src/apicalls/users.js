import { axiosInstance } from "./index.js";

export const loginUser = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/api/users/login", payload);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const registerUser = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/api/users/register", payload);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllUser = async () => {
  try {
    const { data } = await axiosInstance.post("/api/users/getallusers");
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getUserInfo = async () => {
  try {
    const { data } = await axiosInstance.post("/api/users/getuserinfo");
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const UpdateUserVerifiedStatus = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/users/updateuserverifiedstatus",
      payload
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
