import axios from "axios";
import { useAppStore } from "../store";
import { AUTH_REFRESH_URL } from "../utils/URLS";
export default function useRefreshToken() {
  const refresh = async () => {
    try {
      const res = await axios.get(AUTH_REFRESH_URL, {
        withCredentials: true,
      });
      if (res.data && res.status === 200) {
        useAppStore.setState((prev) => ({
          authInfo: { ...prev.authInfo, token: res.data.token },
        }));
      }
    } catch (error) {
      console.log(error);
      console.log(error?.data?.response?.msg);
    }
  };
  return refresh;
}
