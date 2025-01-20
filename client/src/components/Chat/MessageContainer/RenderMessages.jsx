import React from "react";
import dayjs from "dayjs";
import { useAppStore } from "../../../store";
import { useShallow } from "zustand/shallow";
import CreateMessage from "./CreateMessage";
import RenderUnreadMessages from "./RenderUnreadMessages";
import Message from "./Message";
import RenderMessageType from "./RenderMessageType";

export default function RenderMessages() {
  let latestDate = null;
  const { selectedChatMessages, userInfo } = useAppStore(
    useShallow((state) => ({
      selectedChatMessages: state.selectedChatMessages,
      userInfo: state.userInfo,
    }))
  );

  return selectedChatMessages.map((message, index) => {
    const isSender = message.sender === userInfo._id;

    const messageDate = dayjs(message.timeStamps).format("YYYY-MM-DD");
    const showDate = latestDate !== messageDate;
    latestDate = messageDate;
    return (
      <CreateMessage
        key={message._id}
        showDate={showDate}
        timeStamps={message.timeStamps}
      >
        <RenderUnreadMessages
          messageSender={message.sender}
          messageId={message._id}
        />
        <Message
          messageId={message._id}
          messageSender={message.sender}
          isSender={isSender}
          timeStamps={message.timeStamps}
          repliedMessageRef={message.reply?.messageRef}
          repliedFile={message.reply?.repliedFile}
          replySender={message.reply?.sender}
          repliedText={message.reply?.repliedText}
          messageReply={message.reply}
        >
          <RenderMessageType
            messageType={message.messageType}
            messageSender={message.sender}
            isSender={isSender}
            messageContent={message.content}
            messageId={message._id}
            isRecording={message.isRecording}
            messageFiles={message.fileUrl}
            combinedMessageFiles={message.contentAndFile?.files}
            combinedMessageText={message.contentAndFile?.text}
          />
        </Message>
      </CreateMessage>
    );
  });
}
