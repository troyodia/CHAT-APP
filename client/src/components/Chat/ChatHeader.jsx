import React from "react";
import block from "../../images/icons/blockUserIcon.png";
import cancel from "../../images/icons/cancelround.png";
import settings from "../../images/icons/settingsIcon.png";
import { useEffect, useRef, useState } from "react";
import { useAppStore } from "../../store/index.js";
import { shallow, useShallow } from "zustand/shallow";
import phoneCallIcon from "../../images/icons/telephone.png";
import videoCallIcon from "../../images/icons/videoCallIcon.png";
import axiosInstance from "../../utils/axiosInstance.js";
import { useSocket } from "../../use-contexts/socketContext.jsx";
export default function ChatHeader() {
  console.log("child");
  const getOnlinestatusUrl = "http://localhost:5000/api/v1/auth/isOnline";
  const socket = useSocket();
  const {
    selectedChatData,
    setActiveItem,
    closeChat,
    setToggleSettings,
    setVoiceCall,
    setVideoCall,
    isOnline,
  } = useAppStore(
    useShallow((state) => ({
      selectedChatData: state.selectedChatData,
      setActiveItem: state.setActiveItem,
      closeChat: state.closeChat,
      setToggleSettings: state.setToggleSettings,
      setVoiceCall: state.setVoiceCall,
      setVideoCall: state.setVideoCall,
      isOnline: state.isOnline,
    }))
  );
  const handleVoiceCall = () => {
    setVoiceCall({
      ...selectedChatData,
      type: "out-going",
      callType: "voice",
      roomId: Date.now(),
    });
  };
  const handleVideoCall = () => {
    setVideoCall({
      ...selectedChatData,
      type: "out-going",
      callType: "video",
      roomId: Date.now(),
    });
  };
  useEffect(() => {
    if (socket) {
      const setIsOnline = useAppStore.getState().setIsOnline;

      const handleOfflineFunc = (data) => {
        console.log(data);
        console.log("contact offline");
        setIsOnline(false);
      };
      const handleOnlineFunc = (data) => {
        setIsOnline(true);
      };
      socket.on("contact-offline", handleOfflineFunc);
      socket.on("contact-online", handleOnlineFunc);
      return () => {
        socket.off("contact-offline", handleOfflineFunc);
        socket.off("contact-online", handleOnlineFunc);
      };
    }
  }, [socket]);
  useEffect(() => {
    const selectedChatData = useAppStore.getState().selectedChatData;
    const setIsOnline = useAppStore.getState().setIsOnline;
    const getOnlinestatus = async () => {
      try {
        const res = await axiosInstance.post(
          getOnlinestatusUrl,
          { contactId: selectedChatData.id },
          { withCredentials: true }
        );
        if (res.data && res.status === 200) {
          console.log(res.data.contactOnlineStatus);
          setIsOnline(res.data.contactOnlineStatus.onlineStatus);
        }
      } catch (error) {
        console.log(error?.response?.data?.msg);
      }
    };
    getOnlinestatus();
  }, [selectedChatData]);
  return (
    <div className="flex h-28 w-full items-center">
      <div className="flex items-center">
        <div className="w-16 h-16 ml-8 mr-4">
          {selectedChatData ? (
            <img
              className="w-16 h-16 rounded-lg object-cover"
              src={`http://localhost:5000/uploads/profiles/${selectedChatData.image}`}
              alt=""
            ></img>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-xl mx-auto capitalize">
            {selectedChatData
              ? selectedChatData.firstname + " " + selectedChatData.lastname
              : ""}
          </span>
          <span className="italic text-[#FFD700] font-semibold">
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>
      <div className="flex ml-10">
        <button
          className="w-9 pt-1"
          onClick={() => {
            closeChat();
            setActiveItem(undefined);
          }}
        >
          <img src={cancel} alt=""></img>
        </button>
      </div>
      <div className="mr-6 ml-auto">
        <button className="w-7" onClick={handleVoiceCall}>
          <img src={phoneCallIcon} alt=""></img>
        </button>
      </div>
      <div className="mr-6 pt-1">
        <button className="w-10" onClick={handleVideoCall}>
          <img src={videoCallIcon} alt=""></img>
        </button>
      </div>
      <div className="flex mr-6 ">
        <button className="w-10">
          <img src={block} alt=""></img>
        </button>
      </div>
      <div className="flex mr-6 ">
        <button
          className="w-7"
          onClick={() => {
            setToggleSettings();
            console.log(
              process.env.REACT_APP_PUBLIC_ZEGO_APP_ID,
              process.env.REACT_APP_PUBLIC_ZEGO_SERVER_SECRET
            );
          }}
        >
          <img src={settings} alt=""></img>
        </button>
      </div>
    </div>
  );
}
