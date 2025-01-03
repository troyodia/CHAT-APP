import React from "react";
// import block from "../../images/icons/blockUserIcon.png";
import block from "../../images/icons/blockLock.png";
import unblock from "../../images/icons/unblocklock.png";

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
    toggleSettings,
    setToggleSettings,
    setVoiceCall,
    setVideoCall,
    isOnline,
    disableMessageBar,
    setDisabledMessageBar,
    blockedContacts,
    setBlockedContacts,
    setDisableReplyButton,
  } = useAppStore(
    useShallow((state) => ({
      selectedChatData: state.selectedChatData,
      setActiveItem: state.setActiveItem,
      closeChat: state.closeChat,
      toggleSettings: state.toggleSettings,
      setToggleSettings: state.setToggleSettings,
      setVoiceCall: state.setVoiceCall,
      setVideoCall: state.setVideoCall,
      isOnline: state.isOnline,
      disableMessageBar: state.disableMessageBar,
      setDisabledMessageBar: state.setDisabledMessageBar,
      blockedContacts: state.blockedContacts,
      setBlockedContacts: state.setBlockedContacts,
      setDisableReplyButton: state.setDisableReplyButton,
    }))
  );

  const blockUserUrl = "http://localhost:5000/api/v1/contact/blockContact";
  const unblockUserUrl = "http://localhost:5000/api/v1/contact/unblockContact";
  const blockUserSocket = (data) => {
    socket.emit("user-block-status", {
      contact: selectedChatData.id,
      status: data.includes(selectedChatData.id),
    });
  };
  const handleBlockUser = async () => {
    try {
      const res = await axiosInstance.post(
        blockUserUrl,
        { contact: selectedChatData.id },
        { withCredentials: true }
      );
      if (res.data && res.status === 200) {
        console.log(res.data.blockedContactsArr);
        const { blockedContacts } = res.data.blockedContactsArr;
        setBlockedContacts(blockedContacts);
        blockUserSocket(blockedContacts);
        setDisableReplyButton(true);
        useAppStore.setState((prev) => ({
          uploadedFilesMap: new Map(prev.uploadedFilesMap).set(
            selectedChatData.id,
            []
          ),
        }));
        useAppStore.setState((prev) => ({
          replyMap: new Map(prev.replyMap).set(selectedChatData.id, undefined),
        }));
        useAppStore.setState((prev) => ({
          messageMap: new Map(prev.messageMap).set(selectedChatData.id, ""),
        }));
        useAppStore.setState((prev) => ({
          audioRecordingMap: new Map(prev.audioRecordingMap).set(
            selectedChatData.id,
            false
          ),
        }));
      }
    } catch (error) {
      console.log(error?.response?.data?.msg);
    }
  };
  const handleUnBlockUser = async () => {
    try {
      const res = await axiosInstance.post(
        unblockUserUrl,
        { contact: selectedChatData.id },
        { withCredentials: true }
      );
      if (res.data && res.status === 200) {
        console.log(res.data.blockedContactsArr);
        const { blockedContacts: userBlockedContacts } =
          res.data.blockedContactsArr;
        setBlockedContacts(userBlockedContacts);
        blockUserSocket(userBlockedContacts);
        setDisableReplyButton(false);
      }
    } catch (error) {
      console.log(error?.response?.data?.msg);
    }
  };
  useEffect(() => {
    console.log(blockedContacts);
  }, [blockedContacts]);
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
    const controller = new AbortController();
    const getOnlinestatus = async () => {
      try {
        const res = await axiosInstance.post(
          getOnlinestatusUrl,
          { contactId: selectedChatData.id },
          { withCredentials: true, signal: controller.signal }
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
    return () => {
      controller.abort();
    };
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

            setToggleSettings(false);
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
      <div className="flex mr-6 relative group">
        <button
          className="w-6 "
          onClick={() => {
            if (blockedContacts.includes(selectedChatData.id)) {
              handleUnBlockUser();
            } else {
              handleBlockUser();
            }
          }}
        >
          <img
            src={
              !blockedContacts.includes(selectedChatData.id) ? block : unblock
            }
            alt=""
          ></img>
          <span
            className=" w-16 p-2 top-8 left-1/2 -translate-x-1/2  
        text-sm text-black bg-white hidden group-hover:flex group-hover:justify-center absolute rounded-lg capitalize"
          >
            {!blockedContacts.includes(selectedChatData.id)
              ? "Block " + selectedChatData.firstname
              : "Unblock " + selectedChatData.firstname}
          </span>{" "}
        </button>
      </div>
      <div className="flex mr-6 ">
        <button
          className="w-7"
          onClick={() => {
            useAppStore.setState((prev) => ({
              toggleSettings: !prev.toggleSettings,
            }));
          }}
        >
          <img src={settings} alt=""></img>
        </button>
      </div>
    </div>
  );
}
