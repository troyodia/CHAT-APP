import React from "react";
import replyIcon from "../../../images/icons/reply.png";
import replyRightIcon from "../../../images/icons/replyright.png";
import { useAppStore } from "../../../store";
import { shallow } from "zustand/shallow";
import { useState, useEffect } from "react";
import { useSocket } from "../../../use-contexts/socketContext";
function ReplyButton({
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
  const blockedByUser = useAppStore((state) => state.blockedByUser, shallow);
  const blockedContacts = useAppStore(
    (state) => state.blockedContacts,
    shallow
  );
  return (
    <button
      className={`w-full group  cursor-pointer `}
      onClick={() => {
        if (
          blockedContacts.length > 0
            ? !blockedContacts.includes(selectedChatData.id)
            : !blockedByUser
        )
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
        className={`w-6 invisible group-hover:visible group-hover/files:visible group-hover/texts:visible 
         ${!isSender && "ml-auto"}`}
        src={isSender ? replyRightIcon : replyIcon}
        alt=""
      ></img>
    </button>
  );
}
export default React.memo(ReplyButton);
