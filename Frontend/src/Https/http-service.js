import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, //for enable cookie
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const sendOtp = (data) => {
  return api.post("/api/send-otp", data);
};
export const verifyOtp = (data) => {
  return api.post("/api/verify-otp", data);
};
export const activate = (data) => {
  return api.post("/api/activate", data);
};
export default api;
