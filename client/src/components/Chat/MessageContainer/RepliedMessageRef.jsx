import React from "react";
import repliedIconFlip from "../../../images/icons/replyIconFlip.png";
import fileImage from "../../../images/icons/myfile.png";
import { useAppStore } from "../../../store";
import { useShallow } from "zustand/shallow";
import { isImage } from "../../../utils/isImage";
function RepliedMessageRef({
  repliedMessageRef,
  repliedFile,
  repliedText,
  replySender,
  messageReply,
}) {
  const { selectedChatData, userInfo } = useAppStore(
    useShallow((state) => ({
      selectedChatData: state.selectedChatData,
      userInfo: state.userInfo,
    }))
  );
  const handleReplyName = (replyId) => {
    if (replyId === userInfo._id) {
      return userInfo.firstname;
    } else {
      return selectedChatData.firstname;
    }
  };
  return (
    messageReply && (
      <button
        className="flex border rounded-lg p-2 items-center space-x-4 mt-2"
        onClick={() => {
          console.log(repliedMessageRef);
          const element = document.getElementById(repliedMessageRef);
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });

          useAppStore.setState((prev) => ({
            scrollHighlight: new Map(prev.scrollHighlight).set(
              repliedMessageRef,
              true
            ),
          }));
          setTimeout(() => {
            useAppStore.setState((prev) => ({
              scrollHighlight: new Map(prev.scrollHighlight).set(
                repliedMessageRef,
                false
              ),
            }));
          }, 1500);
        }}
      >
        <div className="flex">
          <img className="w-7" src={repliedIconFlip} alt=""></img>
          <p className="italic font-bold "> @{handleReplyName(replySender)}</p>
        </div>
        {repliedText && (
          <p className="text-sm text-[#F5DEB3] break-all max-h-10 max-w-[550px] line-clamp-2">
            {repliedText}
          </p>
        )}
        {repliedFile && isImage(repliedFile) ? (
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
    )
  );
}
export default React.memo(RepliedMessageRef);
