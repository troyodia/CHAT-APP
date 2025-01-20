import axios from "axios";
import { AUTH_REFRESH_URL, BASE_URL } from "./URLS";
const baseURL = `${BASE_URL}/api/v1/`;

const axiosInstance = axios.create({
  baseURL: baseURL,
});

const generateToken = async () => {
  try {
    await axios.get(AUTH_REFRESH_URL, {
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
