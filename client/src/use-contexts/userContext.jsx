import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
const UserContext = createContext(null);
const UpdateUserContext = createContext(null);

export function UserState() {
  return useContext(UserContext);
}
export function UpdateUserState() {
  return useContext(UpdateUserContext);
}
//Use this as a call for the private routes gut everything except for local storage
export function UserProvider({ children }) {
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [userId, setUserId] = useState(null);
  const url = "http://localhost:5000/api/v1/user/getSingleUser";

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosInstance.get(url, {
          withCredentials: true,
        });
        // console.log(res.data.singleUser);
        if (res.data && res.status === 200) {
          const { _id: userId, firstname, lastname } = res.data.singleUser;

          // console.log(userId, firstname, lastname);
          setUserId(userId);
          if (firstname && lastname) {
            setFirstname(firstname);
            setLastname(lastname);
          }
        }
      } catch (error) {
        console.log(error.response?.data?.msg);
        if (error) {
          localStorage.removeItem("isLoggedIn");
        }
      }
    };
    getUser();
  }, []);
  return (
    <UserContext.Provider value={{ firstname, lastname, userId }}>
      <UpdateUserContext.Provider
        value={{ setFirstname, setLastname, setUserId }}
      >
        {children}
      </UpdateUserContext.Provider>
    </UserContext.Provider>
  );
}
