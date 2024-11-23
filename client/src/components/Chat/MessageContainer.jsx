import { useEffect, useRef } from "react";
import defaultImg from "../../images/default.jpeg";
import { useAppStore } from "../../store";
import dayjs from "dayjs";

export default function MessageContainer({ isSmall, isTablet }) {
  const endRef = useRef();

  const { selectedChatMessages, selectedChatData, userInfo, selectedChatType } =
    useAppStore();
  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [selectedChatMessages]);
  const renderMessages = () => {
    let latestDate = null;
    return selectedChatMessages.map((message) => {
      const messageDate = dayjs(message.timeStamps).format("YYYY-MM-DD");
      const showDate = latestDate !== messageDate;
      latestDate = messageDate;
      return (
        <div
          className={`${message.sender === userInfo._id ? "ml-16" : "mr-16"}`}
          key={message._id}
        >
          {showDate ? (
            <div className="flex justify-center text-lg  mb-6 mt-4 text-[#F5DEB3]">
              {dayjs(message.timeStamps).format("dddd, MMMM D")}
            </div>
          ) : (
            ""
          )}
          {selectedChatType === "contact" ? renderDirectMessages(message) : ""}
        </div>
      );
    });
  };
  const renderDirectMessages = (message) => {
    const isSender = message.sender === userInfo._id;
    return (
      <div
        className={`${
          isSender ? "ml-auto mr-4 text-left" : "ml-4  "
        } flex flex-col mt-4 justify-items w-fit max-w-[900px] min-w-0 

       
         `}
      >
        {message.messageType === "text" && (
          <div
            className={`${
              isSender
                ? "border-sky-500 text-sky-500 bg-[#00eeff]/20"
                : "border-white/30 bg-white/10"
            } flex border border-solid rounded-lg p-4 w-full h-full`}
          >
            <p className={`flex w-full break-all`}>{message.content}</p>
          </div>
        )}
        <div
          className={`mt-1 flex ${
            isSender ? "justify-end" : "justify-start"
          } text-[#F5DEB3]`}
        >
          {dayjs(message.timeStamps).format("h:mm A")}
        </div>
      </div>
    );
  };
  return (
    <div
      className="flex flex-col w-full h-full  bg-[#0E0E10] overflow-auto scrollbar-hidden scrollbar-hidden::-webkit-scrollbar"
      id="chat-box"
    >
      {/*Image configuration for sent images*/}
      {/* <div
          className={`ml-auto mt-4 mr-4 ${
            isTablet ? "max-w-[700px] h-[450px]" : "max-w-[700px] h-[550px]"
          } flex`}
        >
          <img
            className="rounded-3xl w-full h-full object-cover"
            src={defaultImg2}
            alt=""
          ></img>
        </div> */}
      {renderMessages()}
      <div ref={endRef}></div>
    </div>
  );
}
