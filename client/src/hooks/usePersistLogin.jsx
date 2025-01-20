import { useState, useEffect } from "react";
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
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    !authInfo?.token ? validateRefresh() : setIsLoading(false);
  }, []);
  return isLoading ? <div>loading...</div> : <Outlet />;
}
