import { useEffect, useState } from "react";
import Chat from "../components/Chat/Chat";
import Detail from "../components/Detail/Detail";
import MessageList from "../components/MessageList/MessageList";
import EmptyChat from "../components/EmptyChat/EmptyChat";
import { useAppStore } from "../store";
import { shallow, useShallow } from "zustand/shallow";
import { useSocket } from "../use-contexts/socketContext";

export default function ChatPage({ emptyChat, chat, detail, messageList }) {
  console.log("chat parent");

  const { selectedChatType, fetchData, toggleSettings } = useAppStore(
    useShallow((state) => ({
      selectedChatType: state.selectedChatType,
      fetchData: state.fetchData,
      toggleSettings: state.toggleSettings,
    }))
  );
  const socket = useSocket();
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  useEffect(() => {
    if (socket) {
      console.log("socket");
      const handleRecieveMessage = (message) => {
        const addMessage = useAppStore.getState().addMessage;
        const selectedChatType = useAppStore.getState().selectedChatType;
        const selectedChatData = useAppStore.getState().selectedChatData;
        // console.log(message);
        if (
          selectedChatType !== undefined &&
          (message.sender._id === selectedChatData.id ||
            message.recipient._id === selectedChatData.id)
        ) {
          addMessage(message);
          // useAppStore.getState().addMessage(message);
          // console.log("message received", message);
        }
      };
      socket.on("recieveMessage", handleRecieveMessage);
      return () => {
        socket.off("recieveMessage", handleRecieveMessage);
      };
    }
  }, [socket]);
  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className=" w-full h-screen flex bg-black/30 text-white">
        {messageList}
        {!selectedChatType && emptyChat}
        {selectedChatType && chat}
        {toggleSettings && detail}
      </div>
    </div>
  );
}
