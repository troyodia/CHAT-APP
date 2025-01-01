import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import defaultImg from "../../images/default.jpeg";
import pictureIcon from "../../images/icons/picture.png";
import fileIcon from "../../images/icons/file-Icon.png";
import pictureIconBlack from "../../images/icons/pictureIconBlack.png";
import fileIconBlack from "../../images/icons/file-Icon-black.png";
import exclamationIcon from "../../images/icons/exclamationIcon.png";
import { useMediaQuery } from "react-responsive";
import { useAppStore } from "../../store";
import axiosInstance from "../../utils/axiosInstance";
import { useShallow } from "zustand/shallow";
import { useSocket } from "../../use-contexts/socketContext";
import { isImage } from "../../utils/isImage";
function UserList({ image, firstname, lastname, id }) {
  const getMessagesURL = "http://localhost:5000/api/v1/messages/getMessages";
  const isMobile = useMediaQuery({ maxWidth: 1200 });
  const transitionPage = useMediaQuery({ maxWidth: 940 });
  const updateMessageReadStatusUrl =
    "http://localhost:5000/api/v1/messages/updateReadStatus";
  const getLastMessageUrl =
    "http://localhost:5000/api/v1/messages/getLastMessage";
  const socket = useSocket();
  const {
    setSelectedChatType,
    setSelectedChatData,
    selectedChatMessages,
    activeItem,
    setActiveItem,
    messageNotification,
    unreadMessages,
    firstUnreadMessage,
    lastMessageMap,
    setUnreadMessages,
  } = useAppStore(
    useShallow((state) => ({
      setSelectedChatType: state.setSelectedChatType,
      setSelectedChatData: state.setSelectedChatData,
      selectedChatMessages: state.selectedChatMessages,
      activeItem: state.activeItem,
      setActiveItem: state.setActiveItem,
      messageNotification: state.messageNotification,
      unreadMessages: state.unreadMessages,
      firstUnreadMessage: state.firstUnreadMessage,
      lastMessageMap: state.lastMessageMap,
      setUnreadMessages: state.setUnreadMessages,
    }))
  );
  const handleDirectMessageClick = (id) => {
    setActiveItem(id);
  };
  const clearNotifications = async () => {
    if (messageNotification.has(id)) {
      try {
        const res = await axiosInstance.post(
          updateMessageReadStatusUrl,
          {
            isUnread: false,
            messageId: undefined,
            markAllAsRead: true,
            contactId: id,
          },
          { withCredentials: true }
        );
        if (res.data && res.status === 200) {
          // console.log(res.data.msg);
          useAppStore.setState((prev) => ({
            messageNotification: new Map(prev.messageNotification).set(id, 0),
          }));
          setUnreadMessages([]);
        }
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };
  useEffect(() => {
    console.log(messageNotification);
  }, [messageNotification]);
  useEffect(() => {
    let count = 0;
    unreadMessages.forEach((message) => {
      if (message.sender === id) {
        count = count + 1;
      }
    });
    if (count > 0) {
      useAppStore.setState((prev) => ({
        messageNotification: new Map(prev.messageNotification).set(id, count),
      }));
    }
  }, [unreadMessages, id]);
  useEffect(() => {
    console.log(firstUnreadMessage);
  }, [firstUnreadMessage]);
  const setLastMessageMap = (contactid, lastMessage) => {
    useAppStore.setState((prev) => ({
      lastMessageMap: new Map(prev.lastMessageMap).set(contactid, lastMessage),
    }));
  };
  useEffect(() => {
    const getLastContactMessage = async () => {
      try {
        const res = await axiosInstance.post(
          getLastMessageUrl,
          { contactId: id },
          { withCredentials: true }
        );
        if (res.data && res.status === 200) {
          const {
            data: {
              lastMessage: [message],
            },
          } = res;
          console.log(message);

          if (message !== undefined) {
            const { messages } = message;
            if (messages.messageType === "text") {
              setLastMessageMap(id, {
                type: "text",
                message: messages.content,
              });
            }
            if (messages.messageType === "file") {
              setLastMessageMap(id, {
                type: "file",
                message: messages.fileUrl[messages.fileUrl.length - 1],
              });
            }
            if (messages.messageType === "combined") {
              setLastMessageMap(id, {
                type: "combined",
                message: messages.contentAndFile.text,
              });
            }
          } else {
            setLastMessageMap(id, {
              type: "empty",
              message: "No messages in chat",
            });
          }
        }
      } catch (error) {
        console.log(error);
        console.log(error?.response?.data?.msg);
      }
    };
    getLastContactMessage();
  }, [id]);

  return (
    <button
      className={`relative flex w-full items-center 
     px-4 py-2 border border-solid border-transparent rounded-lg hover:border-white ${
       activeItem === id ? "bg-white text-black" : ""
     }`}
      onClick={() => {
        if (activeItem !== id) {
          handleDirectMessageClick(id);
          setSelectedChatType("contact");
          setSelectedChatData({
            image,
            firstname,
            lastname,
            id,
          });
          clearNotifications();
        }
      }}
    >
      <div className="w-10 h-10 ">
        <img
          className="w-10 h-10 object-cover rounded-lg"
          src={`http://localhost:5000/uploads/profiles/${image}`}
          alt=""
        ></img>
      </div>
      <div
        className={`flex flex-col ml-4 ${
          activeItem !== id ? "text-[#F5DEB3]" : "text-black"
        }`}
      >
        <p
          className={`font-semibold capitalize ${
            activeItem !== id ? "text-white" : "text-[#FFD700]"
          } flex items-start ${
            transitionPage ? "text-xl" : isMobile ? "text-sm" : "text-lg"
          }`}
        >
          {firstname} {lastname}
        </p>
        {lastMessageMap &&
          (lastMessageMap.get(id) !== undefined || null) &&
          lastMessageMap.get(id).type === "text" && (
            <p className={`items-end flex text-xs font-semibold`}>
              {lastMessageMap.get(id).message}
            </p>
          )}
        {lastMessageMap &&
          (lastMessageMap.get(id) !== undefined || null) &&
          lastMessageMap.get(id).type === "empty" && (
            <p className={`items-end flex italic text-xs font-semibold`}>
              {lastMessageMap.get(id).message}
            </p>
          )}
        {lastMessageMap &&
          (lastMessageMap.get(id) !== undefined || null) &&
          lastMessageMap.get(id).type === "combined" && (
            <p className={`items-end flex text-xs font-semibold`}>
              {lastMessageMap.get(id).message}
            </p>
          )}
        {lastMessageMap &&
          (lastMessageMap.get(id) !== undefined || null) &&
          lastMessageMap.get(id).type === "file" && (
            <div className="flex space-x-1 items-center font-semibold">
              {isImage(lastMessageMap.get(id).message) ? (
                <>
                  <img
                    className="w-6"
                    src={activeItem === id ? pictureIconBlack : pictureIcon}
                    alt=""
                  ></img>
                  <span className="text-xs">Image</span>
                </>
              ) : (
                <>
                  <img
                    className="w-4"
                    src={activeItem === id ? fileIconBlack : fileIcon}
                    alt=""
                  ></img>
                  <span className="text-xs">File</span>
                </>
              )}
            </div>
          )}
      </div>
      {messageNotification &&
        (messageNotification.get(id) !== undefined || null) &&
        messageNotification.get(id) !== 0 && (
          <div className="flex items-center justify-center absolute top-1/2  transform -translate-y-1/2 right-6 ">
            <img className="w-4 h-4" src={exclamationIcon} alt=""></img>
            <div className=" font-semibold text-sm">
              {messageNotification.get(id)}
            </div>
          </div>
        )}
    </button>
  );
}
export default React.memo(UserList);
