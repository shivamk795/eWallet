import { axiosInstance } from "./index.js";

export const GetAllRequestsByUser = async () => {
  try {
    const { data } = await axiosInstance.post(
      "/api/requests/get-all-requests-by-user"
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const SendRequest = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/requests/send-request",
      payload
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const updateRequestStatus = async (request) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/requests/update-request-status",
      request
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
