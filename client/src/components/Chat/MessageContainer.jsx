import { useEffect, useRef } from "react";
import defaultImg from "../../images/default.jpeg";
import replyIcon from "../../images/icons/reply.png";
import replyRightIcon from "../../images/icons/replyright.png";
import fileImage from "../../images/icons/myfile.png";
import downloadIcon from "../../images/icons/download.png";
import { useAppStore } from "../../store";
import dayjs from "dayjs";
import axiosInstance from "../../utils/axiosInstance";
import { isImage } from "../../utils/isImage";
import { v4 as uuidv4 } from "uuid";

export default function MessageContainer({ isSmall, isTablet }) {
  const endRef = useRef();

  const {
    selectedChatMessages,
    selectedChatData,
    userInfo,
    selectedChatType,
    setReply,
    reply,
    setIsFile,
  } = useAppStore();
  useEffect(() => {
    console.log(reply);
  }, [reply]);
  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [selectedChatMessages]);
  const getMessagesURL = "http://localhost:5000/api/v1/messages/getMessages";
  useEffect(() => {
    const { addMessage, setSelectedChatMessages } = useAppStore.getState();

    const populateMessages = async () => {
      try {
        const res = await axiosInstance.post(
          getMessagesURL,
          { contactId: selectedChatData.id },
          { withCredentials: true }
        );
        if (res.data && res.status === 200) {
          setSelectedChatMessages(res.data);
        }
      } catch (error) {
        console.log(error?.response?.data?.msg);
      }
    };
    if (selectedChatData) {
      if (selectedChatType === "contact") populateMessages();
    }
  }, [selectedChatData, selectedChatType]);

  const renderMessages = () => {
    let latestDate = null;
    return selectedChatMessages.map((message) => {
      const messageDate = dayjs(message.timeStamps).format("YYYY-MM-DD");
      const showDate = latestDate !== messageDate;
      latestDate = messageDate;
      return (
        <div key={message._id}>
          <div>
            {showDate ? (
              <div className="flex justify-center text-lg  mb-6 mt-4 text-[#F5DEB3] ">
                {dayjs(message.timeStamps).format("dddd, MMMM D")}
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            className={`${message.sender === userInfo._id ? "ml-16" : "mr-16"}`}
            key={message._id}
          >
            {/* {showDate ? (
            <div className="flex justify-center text-lg  mb-6 mt-4 text-[#F5DEB3] border">
              {dayjs(message.timeStamps).format("dddd, MMMM D")}
            </div>
          ) : (
            ""
          )} */}
            {selectedChatType === "contact"
              ? renderDirectMessages(message)
              : ""}
          </div>
        </div>
      );
    });
  };
  const renderDirectMessages = (message) => {
    const isSender = message.sender === userInfo._id;
    return (
      <div
        className={`${
          isSender ? " ml-auto mr-4 text-left" : "ml-4  "
        } group/reply relative flex flex-col mt-4 justify-items w-fit max-w-[900px] min-w-0 
         `}
      >
        <button
          className={`w-full group`}
          onClick={() => {
            setReply({
              id: message.sender,
              message: message.content ? message.content : message.fileUrl,
            });
          }}
        >
          <img
            className={`w-6 invisible group-hover:visible group-hover/reply:visible ${
              !isSender && "ml-auto"
            }`}
            src={isSender ? replyRightIcon : replyIcon}
            alt=""
          ></img>
        </button>
        {message.messageType === "text" && (
          <div
            className={`${
              isSender
                ? "border-sky-500 text-sky-500 bg-[#00eeff]/20 "
                : "border-white/30 bg-white/10 "
            } flex border border-solid rounded-lg p-4 w-full h-full`}
          >
            <p className={`flex w-full break-all`}>{message.content}</p>
          </div>
        )}
        {message.messageType === "file" &&
          message.fileUrl.map((file) => {
            console.log(file);
            return isImage(file) ? (
              <div className="w-full mb-4 " key={message._id}>
                <img
                  className={`${
                    isSender ? "border-sky-500 " : "border-white/30"
                  } rounded-3xl max-w-[600px] max-h-[600px] object-contain border border-solid `}
                  src={`http://localhost:5000/uploads/files/${file}`}
                  alt=""
                ></img>
              </div>
            ) : (
              <div
                className={`flex items-center justify-between border border-solid rounded-md p-6 w-[350px] bg-white/10 ${
                  isSender ? "border-sky-500 " : "border-white/30"
                }`}
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-black/60">
                  <img className="w-8" src={fileImage} alt=""></img>
                </div>
                <div className=" w-[120px] text-lg text-[#F5DEB3] break-all">
                  {file}
                </div>
                <button className="flex items-center justify-center w-14 h-14 rounded-full bg-black/60">
                  <img className="w-12" src={downloadIcon} alt=""></img>
                </button>
              </div>
            );
          })}
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
      <div className="" ref={endRef}></div>
    </div>
  );
}
