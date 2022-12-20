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
export const logout = () => {
  return api.post("/api/logout");
};
export const createRoom = (data) => {
  return api.post("/api/rooms", data);
};
export const getAllRooms = () => {
  return api.get("/api/rooms");
};

//we will use an INTERCEPTOR to check if the res it 401, then we have to refresh the access token.
//axios provides interceptors to modify values of req or res object.
//we are interested in response so we are using api.interceptors.response.use() ,
//if we had to modify the request obj we would have used api.interceptors.request.use();
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`, {
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        });

        return api.request(originalRequest);
      } catch (err) {
        console.log("i am here");
        console.log(err.message);
      }
    }
    throw error;
  }
);
//config has all the details of res and the end point from which this res came. error is to handle the error(http errors);

export default api;

/**
 * Interceptors: Interceptors have access to response/request before and after the route handler is called.
 * Middlewere:Middleware is called only before the route handler is called. You have access to the response object,
 *  but you don't have the result of the route handler. They are basically express middleware functions.
 */
