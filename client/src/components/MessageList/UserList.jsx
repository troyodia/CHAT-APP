import { useEffect, useState } from "react";
import defaultImg from "../../images/default.jpeg";
import { useMediaQuery } from "react-responsive";
import { useAppStore } from "../../store";
import axiosInstance from "../../utils/axiosInstance";
import { useShallow } from "zustand/shallow";

export default function UserList({
  image,
  firstname,
  lastname,
  id,
  handleDirectMessageClick,
}) {
  const getMessagesURL = "http://localhost:5000/api/v1/messages/getMessages";
  const isMobile = useMediaQuery({ maxWidth: 1200 });
  const transitionPage = useMediaQuery({ maxWidth: 940 });
  const { setSelectedChatType, setSelectedChatData, activeItem } = useAppStore(
    useShallow((state) => ({
      setSelectedChatType: state.setSelectedChatType,
      setSelectedChatData: state.setSelectedChatData,
      activeItem: state.activeItem,
    }))
  );

  return (
    <div
      className={`flex w-full items-center 
     px-4 py-2 border border-solid border-transparent rounded-lg hover:border-white ${
       activeItem === id ? "bg-white text-black" : ""
     }`}
      onClick={() => {
        handleDirectMessageClick(id);
        setSelectedChatType("contact");
        setSelectedChatData({
          image,
          firstname,
          lastname,
          id,
        });
      }}
    >
      <div className="w-10 h-10 ">
        <img
          className="w-10 h-10 object-cover rounded-lg"
          src={`http://localhost:5000/uploads/profiles/${image}`}
          alt=""
        ></img>
      </div>
      <div className="ml-4">
        <p
          className={`font-semibold capitalize ${
            transitionPage ? "text-xl" : isMobile ? "text-sm" : "text-lg"
          }`}
        >
          {firstname} {lastname}
        </p>
        <p
          className={`${
            transitionPage ? "text-base" : isMobile ? "text-xs" : "text-sm"
          }`}
        >
          Hello
        </p>
      </div>
    </div>
  );
}
