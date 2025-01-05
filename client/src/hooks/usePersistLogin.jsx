import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import useRefreshToken from "./useRefreshToken";
import { useAppStore } from "../store";
import { shallow } from "zustand/shallow";
import { Outlet } from "react-router-dom";

export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const authInfo = useAppStore((state) => state.authInfo, shallow);
  const refresh = useRefreshToken();

  useEffect(() => {
    const validateRefresh = async () => {
      try {
        await refresh();
        console.log(authInfo);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    // if (authInfo)
    !authInfo?.token ? validateRefresh() : setIsLoading(false);
  }, []);
  return isLoading ? <div>loading...</div> : <Outlet />;
}
