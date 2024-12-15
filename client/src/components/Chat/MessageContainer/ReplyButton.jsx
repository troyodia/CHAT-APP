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
  const setReply = useAppStore((state) => state.setReply, shallow);
  return (
    <button
      className={`w-full group  `}
      onClick={() => {
        setReply({
          sender: sender,
          repliedText: replyContent,
          repliedFile: replyFile,
        });
        // console.log(reply);
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
