import React from "react";
import { useSocket } from "../../../use-contexts/socketContext";
import { useAppStore } from "../../../store";
import { useShallow } from "zustand/shallow";
import { useMediaQuery } from "react-responsive";
export default function SendMessageButton() {
  const socket = useSocket();
  const isTablet = useMediaQuery({ maxWidth: 1400 });
  const isSmall = useMediaQuery({ maxWidth: 1140 });
  const {
    selectedChatType,
    selectedChatData,
    userInfo,
    uploadedFilesMap,
    replyMap,
    messageMap,
  } = useAppStore(
    useShallow((state) => ({
      selectedChatType: state.selectedChatType,
      selectedChatData: state.selectedChatData,
      userInfo: state.userInfo,
      setUploadedFiles: state.setUploadedFiles,
      uploadedFilesMap: state.uploadedFilesMap,
      replyMap: state.replyMap,
      messageMap: state.messageMap,
    }))
  );
  const handleSendMessage = () => {
    if (selectedChatType === "contact") {
      if (
        messageMap.get(selectedChatData.id) !== undefined &&
        messageMap.get(selectedChatData.id) &&
        (uploadedFilesMap.get(selectedChatData.id) === undefined ||
          uploadedFilesMap.get(selectedChatData.id).length < 1)
      ) {
        socket?.emit("sendMessage", {
          sender: userInfo._id,
          recipient: selectedChatData.id,
          content: messageMap.get(selectedChatData.id),
          messageType: "text",
          fileUrl: undefined,
          contentAndFile: undefined,
          reply: replyMap.get(selectedChatData.id),
        });
      }
      if (
        (messageMap.get(selectedChatData.id) === undefined ||
          !messageMap.get(selectedChatData.id)) &&
        uploadedFilesMap.get(selectedChatData.id) !== undefined &&
        uploadedFilesMap.get(selectedChatData.id).length > 0
      ) {
        socket?.emit("sendMessage", {
          sender: userInfo._id,
          recipient: selectedChatData.id,
          content: undefined,
          messageType: "file",
          fileUrl: uploadedFilesMap.get(selectedChatData.id),
          contentAndFile: undefined,
          reply: replyMap.get(selectedChatData.id),
        });
      }
      if (
        messageMap.get(selectedChatData.id) !== undefined &&
        messageMap.get(selectedChatData.id) &&
        uploadedFilesMap.get(selectedChatData.id) !== undefined &&
        uploadedFilesMap.get(selectedChatData.id).length > 0
      ) {
        socket?.emit("sendMessage", {
          sender: userInfo._id,
          recipient: selectedChatData.id,
          content: undefined,
          messageType: "combined",
          fileUrl: undefined,
          contentAndFile: {
            text: messageMap.get(selectedChatData.id),
            files: uploadedFilesMap.get(selectedChatData.id),
          },
          reply: replyMap.get(selectedChatData.id),
        });
      }
    }
    useAppStore.setState((prev) => ({
      replyMap: new Map(prev.replyMap).set(selectedChatData.id, undefined),
    }));
    useAppStore.setState((prev) => ({
      messageMap: new Map(prev.messageMap).set(selectedChatData.id, ""),
    }));
  };
  return (
    <button
      className={`flex text-black ml-auto mr-4 justify-center rounded ${
        isSmall
          ? "text-lg px-5 py-2"
          : isTablet
          ? "text-lg px-6 py-3"
          : "text-xl px-7 py-4"
      } ${
        (messageMap.get(selectedChatData.id) !== undefined &&
          messageMap.get(selectedChatData.id)) ||
        (uploadedFilesMap.get(selectedChatData.id) !== undefined &&
          uploadedFilesMap.get(selectedChatData.id).length > 0)
          ? "  hover:outline-dashed hover:outline-3 hover:outline-offset-4 hover:outline-cyan-300 bg-[#00eeff]"
          : "bg-gray-800 cursor-not-allowed"
      } ${
        replyMap.get(selectedChatData.id) !== undefined &&
        replyMap.get(selectedChatData.id)
          ? "mt-9"
          : ""
      }
              font-bold `}
      onClick={() => {
        if (
          (messageMap.get(selectedChatData.id) !== undefined &&
            messageMap.get(selectedChatData.id)) ||
          (uploadedFilesMap.get(selectedChatData.id) !== undefined &&
            uploadedFilesMap.get(selectedChatData.id).length > 0)
        )
          handleSendMessage();
        useAppStore.setState((prev) => ({
          uploadedFilesMap: new Map(prev.uploadedFilesMap).set(
            selectedChatData.id,
            []
          ),
        }));
      }}
    >
      Send
    </button>
  );
}
