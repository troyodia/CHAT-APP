import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppStore } from "../store";
import { shallow } from "zustand/shallow";

export default function PrivateRoutes() {
  const authInfo = useAppStore((state) => state.authInfo, shallow);
  const isAuthenticated = !!authInfo;
  console.log(authInfo);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
