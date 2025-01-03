import axios from "axios";
import React from "react";
import { useAppStore } from "../store";
import { shallow } from "zustand/shallow";

export default function useRefreshToken() {
  const refreshUrl = "http://localhost:5000/api/v1/auth/refresh";
  const refresh = async () => {
    try {
      const res = await axios.get(refreshUrl, {
        withCredentials: true,
      });
      if (res.data && res.status === 200) {
        console.log(res.data);
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
