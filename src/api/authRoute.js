import axios from "axios";
import { updateAccessToken } from "../features/authentication";

// Define your API endpoints

const API_URL = `${import.meta.env.VITE_API_URL}`;
const PLAIN_API_URL = `${import.meta.env.VITE_API_URL}`;

const adminLogin = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

const adminForgetPassword = async ({ email }) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, {
      email,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};  

const adminResetPassword = async ({ email, newPassword }) => {
  try {
    const response = await axios.post(`${PLAIN_API_URL}/reset-password`, {
      email,
      newPassword,
    });

    return response;
  } catch (error) {
    console.log("error on reset:", error);
  }
};
const adminVerifyOtp = async ({ email, OTP }) => {
  try {
    const response = await axios.post(`${API_URL}/verify-password`, {
      email,
      OTP,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Password reset failed");
  }
};
export default {
  adminLogin,
  adminForgetPassword,
  adminResetPassword,
  adminVerifyOtp,
};
