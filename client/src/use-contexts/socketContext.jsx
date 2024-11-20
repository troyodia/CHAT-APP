import { useContext, createContext, useEffect, useRef } from "react";

import { io } from "socket.io-client";
import { useAppStore } from "../store";

const SocketContext = createContext(null);
export const useSocket = () => {
  return useContext(SocketContext);
};
export default function SocketProvider({ children }) {
  const socket = useRef();
  const { userInfo, selectedChatType, selectedChatData, addMessage } =
    useAppStore();
  useEffect(() => {
    if (userInfo) {
      socket.current = io("http://localhost:5000", {
        withCredentials: true,
        query: {
          userId: userInfo._id,
        },
      });
      socket.current.on("connection", () =>
        console.log("connected to socket server")
      );

      const handleRecieveMessage = (message) => {
        if (
          selectedChatType !== undefined &&
          (message.sender._id === selectedChatData._id ||
            message.recipient._id === selectedChatData._id)
        ) {
          addMessage(message);
        }
      };
      socket.current.on("recieveMessage", handleRecieveMessage);
      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo]);
  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
}
