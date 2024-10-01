import axios from "axios";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function GetUser() {
  const [user, setUser] = useState({});
  const url = "http://localhost:5000/api/v1/user/profile";
  const getUser = async () => {
    try {
      const { data } = await axiosInstance.get("user/profile", {
        withCredentials: true,
      });
      console.log(data);
    } catch (error) {
      console.log(error?.response?.data?.msg);
    }
  };
  getUser();
}
