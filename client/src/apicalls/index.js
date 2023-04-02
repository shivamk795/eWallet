import axios from "axios";

export const axiosInstance = axios.create({
  headers: {
    // "Content-Type": "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded'
    // 'Content-Type':'multipart/form-data'
    // 'Content-Type': 'application/json;charset=UTF-8'
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    // 'Content-Type':'multipart/form-data;charset=UTF-8'
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
