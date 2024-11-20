import { useContext, createContext, useEffect, useRef } from "react";

import { io } from "socket.io-client";
import { useAppStore } from "../store";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};
export default function SocketProvider({ children }) {
  const socket = useRef();
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io("http://localhost:5000", {
        withCredentials: true,
        query: {
          userId: userInfo._id,
        },
      });
      socket.current.on("connect", () =>
        console.log("connected to socket server")
      );

      const handleRecieveMessage = (message) => {
        const { selectedChatType, selectedChatData, addMessage } =
          useAppStore.getState();
        if (
          selectedChatType !== undefined &&
          (message.sender._id === selectedChatData.id ||
            message.recipient._id === selectedChatData.id)
        ) {
          addMessage(message);
          console.log("message received", message);
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
