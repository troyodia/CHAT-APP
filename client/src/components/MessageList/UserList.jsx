import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import defaultImg from "../../images/default.jpeg";
import exclamationIcon from "../../images/icons/exclamationIcon.png";
import { useMediaQuery } from "react-responsive";
import { useAppStore } from "../../store";
import axiosInstance from "../../utils/axiosInstance";
import { useShallow } from "zustand/shallow";

function UserList({ image, firstname, lastname, id }) {
  const getMessagesURL = "http://localhost:5000/api/v1/messages/getMessages";
  const isMobile = useMediaQuery({ maxWidth: 1200 });
  const transitionPage = useMediaQuery({ maxWidth: 940 });
  const updateMessageReadStatusUrl =
    "http://localhost:5000/api/v1/messages/updateReadStatus";
  const {
    setSelectedChatType,
    setSelectedChatData,
    activeItem,
    setActiveItem,
    messageNotification,
    unreadMessages,
    firstUnreadMessage,
  } = useAppStore(
    useShallow((state) => ({
      setSelectedChatType: state.setSelectedChatType,
      setSelectedChatData: state.setSelectedChatData,
      activeItem: state.activeItem,
      setActiveItem: state.setActiveItem,
      messageNotification: state.messageNotification,
      unreadMessages: state.unreadMessages,
      firstUnreadMessage: state.firstUnreadMessage,
    }))
  );
  const handleDirectMessageClick = (id) => {
    // activeItem === id ? setActiveItem(id) : setActiveItem(id);
    setActiveItem(id);
  };
  const clearNotifications = async () => {
    if (messageNotification.has(id)) {
      // console.log(messageNotification);
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
        }
      } catch (error) {
        console.log(error.response.data.msg);
      }
      useAppStore.setState((prev) => ({
        messageNotification: new Map(prev.messageNotification).set(id, 0),
      }));
    }
  };
  useEffect(() => {
    console.log(messageNotification);
  }, [messageNotification]);
  useEffect(() => {
    // console.log(unreadMessages);
    let count = 0;
    unreadMessages.forEach((message) => {
      if (message.sender === id) {
        // console.log("true");
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
      <div className=" flex flex-col ml-4 ">
        <p
          className={`font-semibold capitalize ${
            transitionPage ? "text-xl" : isMobile ? "text-sm" : "text-lg"
          }`}
        >
          {firstname} {lastname}
        </p>
        <p
          className={`items-end flex ${
            transitionPage ? "text-base" : isMobile ? "text-xs" : "text-sm"
          }`}
        >
          Hello
        </p>
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
