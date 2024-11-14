import React, { useEffect, useLayoutEffect, useRef } from "react";
import { UserState } from "../use-contexts/userContext";
import { useNavigate } from "react-router-dom";
export default function PrivateRoutes({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);
  if (!localStorage.getItem("isLoggedIn")) return <h1>Loading..</h1>;

  return children;
}
