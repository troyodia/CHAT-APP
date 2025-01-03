import React, { useEffect, useRef, useState, Suspense, lazy } from "react";
import replyIcon from "../../../images/icons/reply.png";
import replyRightIcon from "../../../images/icons/replyright.png";
import fileImage from "../../../images/icons/myfile.png";
import downloadIcon from "../../../images/icons/download.png";
import closeIcon from "../../../images/icons/close.png";
import rasengan from "../../../images/icons/newrasengan.png";
import repliedIconFlip from "../../../images/icons/replyIconFlip.png";

import { useAppStore } from "../../../store";
import dayjs from "dayjs";
import axiosInstance from "../../../utils/axiosInstance";
import { isImage } from "../../../utils/isImage";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { useShallow } from "zustand/shallow";
// import VoiceMessage from "./VoiceMessage";

// const VoiceMessage = lazy(() => import("./VoiceMessage"));

export default function MessageContainer({ renderMessages, renderFullScreen }) {
  console.log("Mesage container");
  const endRef = useRef();

  const getMessagesURL = "http://localhost:5000/api/v1/messages/getMessages";

  const {
    selectedChatMessages,
    selectedChatData,
    selectedChatType,
    isDownloading,
    isFullScreen,
  } = useAppStore(
    useShallow((state) => ({
      selectedChatMessages: state.selectedChatMessages,
      selectedChatData: state.selectedChatData,
      selectedChatType: state.selectedChatType,
      isDownloading: state.isDownloading,
      isFullScreen: state.isFullScreen,
    }))
  );
  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [selectedChatMessages]);

  useEffect(() => {
    const setSelectedChatMessages =
      useAppStore.getState().setSelectedChatMessages;
    const controller = new AbortController();
    const populateMessages = async () => {
      try {
        const res = await axiosInstance.post(
          getMessagesURL,
          { contactId: selectedChatData.id },
          { withCredentials: true, signal: controller.signal }
        );
        if (res.data && res.status === 200) {
          setSelectedChatMessages(res.data);
        }
      } catch (error) {
        console.log(error?.response?.data?.msg);
      }
    };
    if (selectedChatData) {
      if (selectedChatType === "contact") populateMessages();
    }
    return () => {
      controller.abort();
    };
  }, [selectedChatData, selectedChatType]);

  return (
    <div
      className=" flex flex-col w-full h-full  bg-[#0E0E10] overflow-auto scrollbar-hidden scrollbar-hidden::-webkit-scrollbar  pb-8"
      id="chat-box"
    >
      {renderMessages}
      <div className="" ref={endRef}></div>
      {isFullScreen && renderFullScreen}

      {isDownloading && (
        <div className="fixed flex justify-center items-center bottom-8 left-1/2 -translate-x-1/2  z-[3000] rounded-full px-5 py-3 bg-black">
          <img className="rounded-lg w-8" src={rasengan} alt=""></img>
          <div className="ml-4 text-lg">Downloading...</div>
        </div>
      )}
    </div>
  );
}
