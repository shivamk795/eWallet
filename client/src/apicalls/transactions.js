import { axiosInstance } from "./index.js";

export const VerifyAccount = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/transactions/verify-account",
      payload
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const TransferFunds = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/transactions/transfer-fund",
      payload
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const GettransactionsOfUser = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/transactions/get-all-transactions-by-user",
      payload
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const DepositFunds = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/transactions/deposit-funds",
      payload
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
