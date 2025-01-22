import { useContext, createContext, useEffect, useState } from "react";

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
      const newSocket = io(
        process.env.REACT_APP_SOCKET_URL_ENVIRONMENT === "dev"
          ? "http://localhost:5000"
          : "https://rasengan.vip",
        // : "https://auth.localhost",

        {
          withCredentials: true,
          query: {
            userId: userInfo._id,
          },
          transports: ["websocket"],
        }
      );
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
