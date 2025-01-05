import React from "react";
import ReplyButton from "./ReplyButton";
import RenderFileMessage from "./RenderFileMessage";
import { v4 as uuidv4 } from "uuid";

function RenderMessageType({
  messageType,
  messageSender,
  messageContent,
  isSender,
  messageId,
  messageFiles,
  isRecording,
  combinedMessageFiles,
  combinedMessageText,
}) {
  return (
    <>
      {messageType === "text" && (
        <div className=" group/texts">
          <ReplyButton
            sender={messageSender}
            replyContent={messageContent}
            replyFile={undefined}
            isSender={isSender}
            messageRefId={messageId}
          />
          <div
            className={`${
              isSender
                ? "border-sky-500 text-sky-500 bg-[#00eeff]/20 "
                : "border-white/30 bg-white/10 "
            } flex border border-solid rounded-lg p-4 mb-2`}
          >
            <p className={`flex w-full break-all`}>{messageContent}</p>
          </div>
        </div>
      )}

      {messageType === "file" &&
        messageFiles.map((file) => {
          return (
            <div className=" group/files" key={uuidv4()}>
              <ReplyButton
                sender={messageSender}
                replyContent={undefined}
                replyFile={file}
                isSender={isSender}
                messageRefId={messageId}
              />

              <RenderFileMessage
                file={file}
                isSender={isSender}
                id={messageId}
                isRecording={isRecording}
              />
            </div>
          );
        })}

      {messageType === "combined" && (
        <div
          className={`flex flex-col ${isSender ? "items-end" : "items-start"}`}
        >
          {combinedMessageFiles.map((file) => {
            return (
              <div className=" group/files" key={uuidv4()}>
                <ReplyButton
                  sender={messageSender}
                  replyContent={undefined}
                  replyFile={file}
                  isSender={isSender}
                  messageRefId={messageId}
                />

                <RenderFileMessage
                  file={file}
                  isSender={isSender}
                  id={messageId}
                  isRecording={isRecording}
                />
              </div>
            );
          })}
          <div className=" group/texts">
            <ReplyButton
              sender={messageSender}
              replyContent={combinedMessageText}
              replyFile={undefined}
              isSender={isSender}
              messageRefId={messageId}
            />
            <div
              className={`${
                isSender
                  ? "border-sky-500 text-sky-500 bg-[#00eeff]/20 "
                  : "border-white/30 bg-white/10 "
              } flex border border-solid rounded-lg p-4 mb-2`}
            >
              <p className={`flex w-full break-all`}>{combinedMessageText}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default React.memo(RenderMessageType);
