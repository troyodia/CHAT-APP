import axios from "axios";
import { useState } from "react";

export default function GetUser() {
  const [user, setUser] = useState({});
  const url = "http://localhost:5000/api/v1/user/profile";
  const token = localStorage.getItem("token");
  const getUser = async () => {
    try {
      const { data } = await axios.get(url, {
        headers: { Authorization: "Bearer " + token },
      });
      console.log(data);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };
  getUser();
}
