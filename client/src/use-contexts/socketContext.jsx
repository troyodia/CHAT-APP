import { useContext, createContext, useEffect, useRef, useState } from "react";

import { io } from "socket.io-client";
import { useAppStore } from "../store";
import { shallow } from "zustand/shallow";

const SocketContext = createContext(null);
export const useSocket = () => {
  return useContext(SocketContext);
};
export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState();
  const userInfo = useAppStore((state) => state.userInfo, shallow);
  console.log("render");
  useEffect(() => {
    if (userInfo) {
      const directMessageContactList =
        useAppStore.getState().directMessageContactList;
      const newSocket = io("http://localhost:5000", {
        withCredentials: true,
        query: {
          userId: userInfo._id,
        },
      });
      setSocket(newSocket);
      newSocket.on("connect", () => console.log("connected to socket server"));
      newSocket.emit("coming-online", directMessageContactList);
      return () => {
        newSocket.disconnect();
      };
    }
  }, [userInfo]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
