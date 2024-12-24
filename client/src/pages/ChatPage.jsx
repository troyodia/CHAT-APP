import { useEffect, useState } from "react";
import Chat from "../components/Chat/Chat";
import Detail from "../components/Detail/Detail";
import MessageList from "../components/MessageList/MessageList";
import EmptyChat from "../components/EmptyChat/EmptyChat";
import { useAppStore } from "../store";
import { shallow, useShallow } from "zustand/shallow";
import { useSocket } from "../use-contexts/socketContext";
import axiosInstance from "../utils/axiosInstance";

export default function ChatPage({ emptyChat, chat, detail, messageList }) {
  const updateMessageReadStatusUrl =
    "http://localhost:5000/api/v1/messages/updateReadStatus";

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
        const userInfo = useAppStore.getState().userInfo;
        const firstUnreadMessage = useAppStore.getState().firstUnreadMessage;
        const setFirstUnreadMessage =
          useAppStore.getState().setFirstUnreadMessage;
        if (
          selectedChatType !== undefined &&
          (message.sender._id === selectedChatData.id ||
            message.recipient._id === selectedChatData.id)
        ) {
          addMessage(message);
          console.log("message received", message);
        }
        if (
          (selectedChatType === undefined ||
            selectedChatData.id !== message.sender._id) &&
          userInfo._id !== message.sender._id
        ) {
          console.log("me");
          const updateMessageReadStatus = async () => {
            try {
              const res = await axiosInstance.post(
                updateMessageReadStatusUrl,
                {
                  isUnread: true,
                  messageId: message._id,
                  markAllAsRead: false,
                  contactId: undefined,
                },
                { withCredentials: true }
              );
              if (res.data && res.status === 200) {
                console.log(res.data.msg);
                if (firstUnreadMessage === undefined) {
                  setFirstUnreadMessage(res.data.firstUnreadMessage);
                }
              }
            } catch (error) {
              console.log(error.response.data.msg);
            }
          };
          updateMessageReadStatus();
          useAppStore.setState((prev) => ({
            messageNotification: new Map(prev.messageNotification).set(
              message.sender._id,
              1 +
                (prev.messageNotification.get(message.sender._id) !== undefined
                  ? prev.messageNotification.get(message.sender._id)
                  : 0)
            ),
          }));
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
