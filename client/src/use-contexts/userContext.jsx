import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const UserContext = createContext({});
const UpdateUserContext = createContext({});

export function UserState() {
  return useContext(UserContext);
}
export function UpdateUserState() {
  return useContext(UpdateUserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={user}>
      <UpdateUserContext.Provider value={setUser}>
        {children}
      </UpdateUserContext.Provider>
    </UserContext.Provider>
  );
}
