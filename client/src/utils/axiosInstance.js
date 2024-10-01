import axios from "axios";

const baseURL = "http://localhost:5000/api/v1/";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

const generateToken = async () => {
  try {
    await axios.get(baseURL + "auth/refresh", {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error.response.data.msg);
  }
};
axiosInstance.interceptors.request.use(
  async (req) => {
    try {
      await generateToken();
      return req;
    } catch (error) {
      console.log("could not refresh token", error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
