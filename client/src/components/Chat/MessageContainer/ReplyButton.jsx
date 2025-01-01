import React from "react";
import replyIcon from "../../../images/icons/reply.png";
import replyRightIcon from "../../../images/icons/replyright.png";
import { useAppStore } from "../../../store";
import { shallow } from "zustand/shallow";
import { useState, useEffect } from "react";
import { useSocket } from "../../../use-contexts/socketContext";
export default function ReplyButton({
  sender,
  replyContent,
  replyFile,
  isSender,
  messageRefId,
}) {
  console.log("reply button");

  const selectedChatData = useAppStore(
    (state) => state.selectedChatData,
    shallow
  );
  const blockedContacts = useAppStore((state) => state.blockedContacts);
  // const [disableReplyButton, setDisableReplyButton] = useState(false);
  const disableReplyButton = useAppStore(
    (state) => state.disableReplyButton,
    shallow
  );

  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      const setDisableReplyButton =
        useAppStore.getState().setDisableReplyButton;
      const handleBlockedStatus = (data) => {
        setDisableReplyButton(data);
      };
      socket.on("update-block-status", handleBlockedStatus);
      return () => {
        socket.off("update-block-status", handleBlockedStatus);
      };
    }
  }, [socket]);
  return (
    // !blockedContacts.includes(selectedChatData.id) &&
    <button
      className={`w-full group  ${
        !disableReplyButton ? " cursor-pointer" : "cursor-default"
      }`}
      onClick={() => {
        useAppStore.setState((prev) => ({
          replyMap: new Map(prev.replyMap).set(selectedChatData.id, {
            sender: sender,
            repliedText: replyContent,
            repliedFile: replyFile,
            messageRef: messageRefId,
          }),
        }));
      }}
    >
      <img
        className={`w-6 invisible ${
          !disableReplyButton
            ? "group-hover:visible group-hover/files:visible group-hover/texts:visible"
            : ""
        } ${!isSender && "ml-auto"}`}
        src={isSender ? replyRightIcon : replyIcon}
        alt=""
      ></img>
    </button>
  );
}
