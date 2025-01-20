import axiosInstance from "../../utils/axiosInstance";
import { GET_SINGLE_USER_URL } from "../../utils/URLS";

export const createAuthSlice = (set, get) => ({
  userInfo: undefined,
  authInfo: undefined,
  error: undefined,
  logout: false,
  setLogout: () => set((state) => ({ logout: !state.logout })),
  setAuthinfo: (authInfo) => set({ authInfo }),
  fetchData: async () => {
    try {
      console.log(GET_SINGLE_USER_URL);
      const res = await axiosInstance.get(GET_SINGLE_USER_URL, {
        withCredentials: true,
      });
      if (res.data && res.status === 200) {
        set({ userInfo: res.data.singleUser });
        console.log(res.data.singleUser);
      }
    } catch (error) {
      console.log(error.response?.data?.msg);
      set({ error: error.response?.data?.msg });
    }
  },
});
