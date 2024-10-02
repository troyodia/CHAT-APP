import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axiosInstance from "../utils/axiosInstance";
const UserContext = createContext({});
const UpdateUserContext = createContext({});

export function UserState() {
  return useContext(UserContext);
}
export function UpdateUserState() {
  return useContext(UpdateUserContext);
}

export function UserProvider({ children }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: {
            user: { userId, firstname, lastname },
          },
        } = await axiosInstance.get("user/profile", {
          withCredentials: true,
        });
        // console.log(userId, firstname, lastname);
        setFirstname(firstname);
        setLastname(lastname);
        setUserId(userId);
      } catch (error) {
        console.log(error?.response?.data?.msg);
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
