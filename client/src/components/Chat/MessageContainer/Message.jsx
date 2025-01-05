import React from "react";
import { useAppStore } from "../../../store";
import { useShallow } from "zustand/shallow";
import RepliedMessageRef from "./RepliedMessageRef";
import dayjs from "dayjs";
function Message({
  messageId,
  messageSender,
  isSender,
  timeStamps,
  children,
  repliedMessageRef,
  repliedFile,
  replySender,
  repliedText,
  messageReply,
}) {
  const { userInfo, selectedChatType, scrollHighlight } = useAppStore(
    useShallow((state) => ({
      userInfo: state.userInfo,
      selectedChatType: state.selectedChatType,
      scrollHighlight: state.scrollHighlight,
    }))
  );
  return (
    <div
      id={messageId}
      className={`${
        scrollHighlight?.get(messageId) !== undefined &&
        scrollHighlight?.get(messageId)
          ? "animate-highlight "
          : ""
      }`}
    >
      <div className={`${messageSender === userInfo._id ? "ml-16" : "mr-16"}`}>
        {selectedChatType === "contact" && (
          <div
            className={` ${
              isSender
                ? " ml-auto mr-4 text-left items-end"
                : "ml-4  items-start"
            } group/items relative flex flex-col mt-4 justify-items w-fit max-w-[900px] min-w-0
 `}
          >
            <RepliedMessageRef
              repliedMessageRef={repliedMessageRef}
              repliedFile={repliedFile}
              replySender={replySender}
              repliedText={repliedText}
              messageReply={messageReply}
            />
            {children}
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
  );
}
export default React.memo(Message);
