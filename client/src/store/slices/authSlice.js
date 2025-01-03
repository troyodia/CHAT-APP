import axiosInstance from "../../utils/axiosInstance";
const url = "http://localhost:5000/api/v1/user/getSingleUser";

export const createAuthSlice = (set, get) => ({
  userInfo: undefined,
  authInfo: undefined,
  error: undefined,
  logout: false,
  setLogout: () => set((state) => ({ logout: !state.logout })),
  setAuthinfo: (authInfo) => set({ authInfo }),
  fetchData: async () => {
    try {
      const res = await axiosInstance.get(url, {
        withCredentials: true,
      });
      if (res.data && res.status === 200) {
        set({ userInfo: res.data.singleUser });
      }
    } catch (error) {
      console.log(error.response?.data?.msg);
      set({ error: error.response?.data?.msg });
    }
  },
});
