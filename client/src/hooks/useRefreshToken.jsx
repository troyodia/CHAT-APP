import axios from "axios";
import { useAppStore } from "../store";

export default function useRefreshToken() {
  const refreshUrl = "http://localhost:5000/api/v1/auth/refresh";
  const refresh = async () => {
    try {
      const res = await axios.get(refreshUrl, {
        withCredentials: true,
      });
      if (res.data && res.status === 200) {
        useAppStore.setState((prev) => ({
          authInfo: { ...prev.authInfo, token: res.data.token },
        }));
      }
    } catch (error) {
      console.log(error?.data?.response?.msg);
    }
  };
  return refresh;
}
