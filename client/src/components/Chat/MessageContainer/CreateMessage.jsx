import React, { useEffect } from "react";
import { useAppStore } from "../../../store";
import { useShallow } from "zustand/shallow";
import RenderFileMessage from "./RenderFileMessage";
import ReplyButton from "./ReplyButton";
import repliedIconFlip from "../../../images/icons/replyIconFlip.png";
import fileImage from "../../../images/icons/myfile.png";
import tickIcon from "../../../images/icons/tickWhite.png";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { isImage } from "../../../utils/isImage";
function CreateMessage({
  showDate,
  timeStamps,
  messageSender,
  isSender,
  messageReply,
  replySender,
  repliedText,
  repliedFile,
  messageType,
  messageContent,
  messageId,
  isRecording,
  isUnread,
  messageFiles,
  combinedMessageFiles,
  combinedMessageText,
}) {
  const { selectedChatData, userInfo, selectedChatType, firstUnreadMessage } =
    useAppStore(
      useShallow((state) => ({
        selectedChatData: state.selectedChatData,
        userInfo: state.userInfo,
        selectedChatType: state.selectedChatType,
        firstUnreadMessage: state.firstUnreadMessage,
      }))
    );
  const handleReplyName = (replyId) => {
    if (replyId === userInfo._id) {
      return userInfo.firstname;
    } else {
      return selectedChatData.firstname;
    }
  };
  const handleClearFirstUnreadMessage = (id) => {
    const newMap = new Map(firstUnreadMessage);
    newMap.delete(id);
    useAppStore.setState((prev) => ({
      firstUnreadMessage: newMap,
    }));
  };
  return (
    <div>
      <div>
        {showDate ? (
          <div className="flex justify-center text-lg  mb-6 mt-4 text-[#F5DEB3] ">
            {dayjs(timeStamps).format("dddd, MMMM D")}
          </div>
        ) : (
          ""
        )}
      </div>
      {firstUnreadMessage &&
        /* firstUnreadMessage.get(messageSender) && */
        firstUnreadMessage.get(messageSender) !== undefined &&
        firstUnreadMessage.get(messageSender) === messageId && (
          <div className="flex w-full space-x-4 items-center m">
            <div className="w-full h-0.5 bg-white"></div>
            <button
              className="flex hover:outline-2 hover:outline-dotted p-2 w-full max-w-fit space-x-0.5 items-center"
              onClick={() => handleClearFirstUnreadMessage(messageSender)}
            >
              <span className="font-semibold">Mark As Read</span>
              <img className="w-6" src={tickIcon} alt=""></img>
            </button>
            <div className="w-full h-0.5 bg-white"></div>
          </div>
        )}
      <div
        className={`${
          firstUnreadMessage &&
          firstUnreadMessage.get(messageSender) &&
          firstUnreadMessage.get(messageSender) !== undefined &&
          isUnread
            ? "bg-sky-600"
            : ""
        }`}
      >
        <div
          className={`${messageSender === userInfo._id ? "ml-16" : "mr-16"}`}
        >
          {selectedChatType === "contact" && (
            <div
              className={`${
                isSender
                  ? " ml-auto mr-4 text-left items-end"
                  : "ml-4  items-start"
              } group/items relative flex flex-col mt-4 justify-items w-fit max-w-[900px] min-w-0
     `}
            >
              {messageReply && (
                <button className="flex border rounded-lg p-2 items-center space-x-4 mt-2 ">
                  <div className="flex">
                    <img className="w-7" src={repliedIconFlip} alt=""></img>
                    <p className="italic font-bold ">
                      {" "}
                      @{handleReplyName(replySender)}
                    </p>
                  </div>
                  {repliedText ? (
                    <p className="text-sm text-[#F5DEB3] break-all max-h-10 max-w-[550px] line-clamp-2">
                      {repliedText}
                    </p>
                  ) : isImage(repliedFile) ? (
                    <div className="w-10 h-10">
                      <img
                        className=" w-full h-full object-cover rounded-md"
                        src={`http://localhost:5000/uploads/files/${repliedFile}`}
                        alt=""
                      ></img>
                    </div>
                  ) : (
                    <div className="flex truncate space-x-2 items-center">
                      <img className="w-6" src={fileImage} alt=""></img>
                      <p className="max-w-96 truncate text-sm text-[#F5DEB3]">
                        {repliedFile}
                      </p>
                    </div>
                  )}
                </button>
              )}

              {messageType === "text" && (
                <div className=" group/texts">
                  <ReplyButton
                    sender={messageSender}
                    replyContent={messageContent}
                    replyFile={undefined}
                    isSender={isSender}
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
                  className={`flex flex-col ${
                    isSender ? "items-end" : "items-start"
                  }`}
                >
                  {combinedMessageFiles.map((file) => {
                    return (
                      <div className=" group/files" key={uuidv4()}>
                        <ReplyButton
                          sender={messageSender}
                          replyContent={undefined}
                          replyFile={file}
                          isSender={isSender}
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
                    />
                    <div
                      className={`${
                        isSender
                          ? "border-sky-500 text-sky-500 bg-[#00eeff]/20 "
                          : "border-white/30 bg-white/10 "
                      } flex border border-solid rounded-lg p-4 mb-2`}
                    >
                      <p className={`flex w-full break-all`}>
                        {combinedMessageText}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div
                className={`mt-1 flex ${
                  isSender ? "justify-end" : "justify-start"
                } text-[#F5DEB3]`}
              >
                {dayjs(timeStamps).format("h:mm A")}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default React.memo(CreateMessage);
