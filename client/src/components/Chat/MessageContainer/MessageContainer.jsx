import React, { useEffect, useRef } from "react";
import rasengan from "../../../images/icons/newrasengan.png";
import { useAppStore } from "../../../store";
import axiosInstance from "../../../utils/axiosInstance";
import { useShallow } from "zustand/shallow";
import { GET_CHAT_MESSAGES } from "../../../utils/URLS";
export default function MessageContainer({ renderMessages, renderFullScreen }) {
  const endRef = useRef(null);

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
    if (endRef.current && selectedChatMessages)
      endRef.current.scrollIntoView({
        behaviour: "smooth",
      });
  }, [selectedChatMessages]);

  useEffect(() => {
    const setSelectedChatMessages =
      useAppStore.getState().setSelectedChatMessages;
    const controller = new AbortController();
    const populateMessages = async () => {
      try {
        const res = await axiosInstance.post(
          GET_CHAT_MESSAGES,
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
      className=" flex flex-col flex-grow w-full h-full bg-[#0E0E10] overflow-auto scrollbar-hidden scrollbar-hidden::-webkit-scrollbar"
      id="chat-box"
    >
      {renderMessages}
      <div className="mt-8" ref={endRef}></div>
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
