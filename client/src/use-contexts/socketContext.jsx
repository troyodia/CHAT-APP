import { UserState } from "./userContext";

import { useContext, createContext, useEffect, useRef } from "react";

import { io } from "socket.io-client";

const SocketContext = createContext(null);
export const useSocket = () => {
  return useContext(SocketContext);
};
export default function SocketProvider({ childern }) {
  const socket = useRef();
  const user = UserState();
  useEffect(() => {
    if (user) {
      socket.current = io("http://localhost:5000", {
        withCredentials: true,
        query: {
          userId: user.userId,
        },
      });
      socket.current.on(
        "connection",
        console.log("connected to socket server")
      );
      return () => {
        socket.current.disconnect();
      };
    }
  }, [user]);
  return (
    <SocketContext.Provider value={socket.current}>
      {childern}
    </SocketContext.Provider>
  );
}
