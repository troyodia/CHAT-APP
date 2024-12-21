import React from "react";
import replyIcon from "../../../images/icons/reply.png";
import replyRightIcon from "../../../images/icons/replyright.png";
import { useAppStore } from "../../../store";
import { shallow } from "zustand/shallow";

export default function ReplyButton({
  sender,
  replyContent,
  replyFile,
  isSender,
}) {
  console.log("reply button");

  const selectedChatData = useAppStore(
    (state) => state.selectedChatData,
    shallow
  );
  return (
    <button
      className={`w-full group  `}
      onClick={() => {
        useAppStore.setState((prev) => ({
          replyMap: new Map(prev.replyMap).set(selectedChatData.id, {
            sender: sender,
            repliedText: replyContent,
            repliedFile: replyFile,
          }),
        }));
      }}
    >
      <img
        className={`w-6 invisible group-hover:visible group-hover/files:visible group-hover/texts:visible ${
          !isSender && "ml-auto"
        }`}
        src={isSender ? replyRightIcon : replyIcon}
        alt=""
      ></img>
    </button>
  );
}
