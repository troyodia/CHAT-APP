import { useContext, createContext, useEffect, useRef, useState } from "react";

import { io } from "socket.io-client";
import { useAppStore } from "../store";
import { shallow } from "zustand/shallow";

const SocketContext = createContext(null);
export const useSocket = () => {
  return useContext(SocketContext);
};
export default function SocketProvider({ children }) {
  // const socket = useRef();
  const [socket, setSocket] = useState();
  const userInfo = useAppStore((state) => state.userInfo, shallow);
  // const { userInfo } = useAppStore();
  console.log("render");
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      const newSocket = io("http://localhost:5000", {
        withCredentials: true,
        query: {
          userId: userInfo._id,
        },
      });
      setSocket(newSocket);
      newSocket.on("connect", () => console.log("connected to socket server"));

      // const handleRecieveMessage = (message) => {
      //   const addMessage = useAppStore.getState().addMessage;
      //   const selectedChatType = useAppStore.getState().selectedChatType;
      //   const selectedChatData = useAppStore.getState().selectedChatData;
      //   console.log(message);
      //   if (
      //     selectedChatType !== undefined &&
      //     (message.sender._id === selectedChatData.id ||
      //       message.recipient._id === selectedChatData.id)
      //   ) {
      //     addMessage(message);
      //     // useAppStore.getState().addMessage(message);
      //     console.log("message received", message);
      //   }
      // };
      // socket.current.on("recieveMessage", handleRecieveMessage);
      return () => {
        newSocket.disconnect();
        // socket.current.off("recieveMessage", handleRecieveMessage);
      };
    }
  }, [userInfo]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
