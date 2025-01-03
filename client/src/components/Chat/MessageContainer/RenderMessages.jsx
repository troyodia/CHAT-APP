import React from "react";
import dayjs from "dayjs";
import { useAppStore } from "../../../store";
import { useShallow } from "zustand/shallow";
import { v4 as uuidv4 } from "uuid";
import repliedIconFlip from "../../../images/icons/replyIconFlip.png";
import fileImage from "../../../images/icons/myfile.png";
import { isImage } from "../../../utils/isImage";
import RenderFileMessage from "./RenderFileMessage";
import ReplyButton from "./ReplyButton";
import CreateMessage from "./CreateMessage";

export default function RenderMessages() {
  let latestDate = null;
  console.log("render messages");
  const { selectedChatMessages, userInfo } = useAppStore(
    useShallow((state) => ({
      selectedChatMessages: state.selectedChatMessages,
      userInfo: state.userInfo,
    }))
  );

  return selectedChatMessages.map((message, index) => {
    console.log("going through ");
    const isSender = message.sender === userInfo._id;

    const messageDate = dayjs(message.timeStamps).format("YYYY-MM-DD");
    const showDate = latestDate !== messageDate;
    latestDate = messageDate;
    return (
      <CreateMessage
        key={message._id}
        index={index}
        showDate={showDate}
        timeStamps={message.timeStamps}
        messageSender={message.sender}
        isSender={isSender}
        messageReply={message.reply}
        replySender={message.reply?.sender}
        repliedText={message.reply?.repliedText}
        repliedFile={message.reply?.repliedFile}
        repliedMessageRef={message.reply?.messageRef}
        messageType={message.messageType}
        messageContent={message.content}
        messageId={message._id}
        isRecording={message.isRecording}
        isUnread={message.isUnread}
        messageFiles={message.fileUrl}
        combinedMessageFiles={message.contentAndFile?.files}
        combinedMessageText={message.contentAndFile?.text}
      />
    );
  });
}
