import React, { useEffect } from "react";

import exclamationIcon from "../../images/icons/exclamationIcon.png";
import { useMediaQuery } from "react-responsive";
import { useAppStore } from "../../store";
import axiosInstance from "../../utils/axiosInstance";
import { useShallow } from "zustand/shallow";
import {
  UPDATE_MESSAGE_READ_STATUS_URL,
  AWS_BASE_FILE_PATH,
} from "../../utils/URLS";
function UserList({ image, firstname, lastname, id, children }) {
  const isMobile = useMediaQuery({ maxWidth: 1200 });
  const transitionPage = useMediaQuery({ maxWidth: 940 });

  const {
    setSelectedChatType,
    setSelectedChatData,
    activeItem,
    setActiveItem,
    messageNotification,
    unreadMessages,
    setUnreadMessages,
  } = useAppStore(
    useShallow((state) => ({
      setSelectedChatType: state.setSelectedChatType,
      setSelectedChatData: state.setSelectedChatData,
      activeItem: state.activeItem,
      setActiveItem: state.setActiveItem,
      messageNotification: state.messageNotification,
      unreadMessages: state.unreadMessages,
      setUnreadMessages: state.setUnreadMessages,
    }))
  );
  const handleDirectMessageClick = () => {
    setActiveItem(id);
  };
  const clearNotifications = async () => {
    if (messageNotification.has(id)) {
      try {
        const res = await axiosInstance.post(
          UPDATE_MESSAGE_READ_STATUS_URL,
          {
            isUnread: false,
            messageId: undefined,
            markAllAsRead: true,
            contactId: id,
          },
          { withCredentials: true }
        );
        if (res.data && res.status === 200) {
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

  return (
    <button
      className={`relative flex w-full items-center 
     px-4 py-2 border border-solid border-transparent rounded-lg hover:border-white
   ${activeItem === id ? "bg-white text-black" : ""}

     `}
      onClick={() => {
        if (activeItem !== id) {
          handleDirectMessageClick();
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
          src={`${AWS_BASE_FILE_PATH}/profiles/${image}`}
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
        {children}
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
