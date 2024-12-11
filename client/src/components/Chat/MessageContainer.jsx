import { useEffect, useRef, useState, Suspense, lazy } from "react";
import defaultImg from "../../images/default.jpeg";
import replyIcon from "../../images/icons/reply.png";
import replyRightIcon from "../../images/icons/replyright.png";
import fileImage from "../../images/icons/myfile.png";
import downloadIcon from "../../images/icons/download.png";
import closeIcon from "../../images/icons/close.png";
import rasengan from "../../images/icons/newrasengan.png";
import repliedIcon from "../../images/icons/replyIcon.png";
import repliedIconFlip from "../../images/icons/replyIconFlip.png";

import { useAppStore } from "../../store";
import dayjs from "dayjs";
import axiosInstance from "../../utils/axiosInstance";
import { isImage } from "../../utils/isImage";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

// import VoiceMessage from "./VoiceMessage";

const VoiceMessage = lazy(() => import("./VoiceMessage"));

export default function MessageContainer({ isSmall, isTablet }) {
  const endRef = useRef();

  const getMessagesURL = "http://localhost:5000/api/v1/messages/getMessages";
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullScreenParams, setFullScreenParams] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMessgae, setAudioMessage] = useState(null);
  const [CurrentPlayBackTime, setCurrentPlayBackTime] = useState(0);
  const [totalRecordingTime, setTotalRecordingTime] = useState(0);

  const waveFormRef = useRef(null);
  const waveForm = useRef(null);

  const {
    selectedChatMessages,
    selectedChatData,
    userInfo,
    selectedChatType,
    setReply,
    reply,
    setIsFile,
    isDownloading,
    setIsDownloading,
    audioRecording,
  } = useAppStore();

  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [selectedChatMessages]);

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

  const downloadFile = async (url) => {
    setIsDownloading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/uploads/files/${url}`,
        { responseType: "blob" }
      );
      if (res.data && res.status === 200) {
        const urlBlob = new Blob([res.data]);
        const tempURL = window.URL.createObjectURL(urlBlob);

        const tempLink = document.createElement("a");
        tempLink.href = tempURL;
        tempLink.setAttribute("download", url);
        document.body.appendChild(tempLink);
        tempLink.click();

        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(tempURL);
        setTimeout(() => {
          setIsDownloading(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error?.response?.data?.msg);
    }
  };
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
  const renderText = (content, isSender, id) => {
    return (
      <div
        className={`${
          isSender
            ? "border-sky-500 text-sky-500 bg-[#00eeff]/20 "
            : "border-white/30 bg-white/10 "
        } flex border border-solid rounded-lg p-4`}
      >
        <p className={`flex w-full break-all`}>{content}</p>
      </div>
    );
  };
  const renderFile = (file, isSender, id, isRecording) => {
    return isImage(file) ? (
      <div className="mb-2 relative group/images">
        <img
          className={`${
            isSender ? "border-sky-500 " : "border-white/30"
          } rounded-3xl max-w-[600px] max-h-[600px] object-contain border border-solid cursor-pointer`}
          src={`http://localhost:5000/uploads/files/${file}`}
          alt=""
          onClick={() => {
            setIsFullScreen(true);
            setFullScreenParams(file);
          }}
        ></img>
        <button
          className="absolute top-2 right-2 flex  items-center justify-center w-10 h-10 rounded-full bg-black invisible group-hover/images:visible"
          onClick={() => downloadFile(file)}
        >
          <img className="w-8 ml-0.5" src={downloadIcon} alt=""></img>
        </button>
      </div>
    ) : isRecording ? (
      <Suspense fallback={<div>loading..</div>}>
        <VoiceMessage file={file} isSender={isSender}></VoiceMessage>
      </Suspense>
    ) : (
      <div
        className={`flex items-center justify-between border border-solid rounded-md p-6 w-[350px] bg-white/10 mb-2 ${
          isSender ? "border-sky-500 " : "border-white/30"
        }`}
      >
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-black/60">
          <img className="w-8" src={fileImage} alt=""></img>
        </div>
        <div className=" w-[150px] text-lg text-[#F5DEB3] break-all">
          {file}
        </div>
        <button
          className="flex items-center justify-center w-14 h-14 rounded-full bg-black/60"
          onClick={() => downloadFile(file)}
        >
          <img className="w-12" src={downloadIcon} alt=""></img>
        </button>
      </div>
    );
  };
  const replyButton = (replyContent, sender, replyFile, isSender) => {
    return (
      <button
        className={`w-full group  `}
        onClick={() => {
          setReply({
            sender: sender,
            repliedText: replyContent,
            repliedFile: replyFile,
          });
          console.log(reply);
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
  };
  const handleReplyName = (replyId) => {
    if (replyId === userInfo._id) {
      return userInfo.firstname;
    } else {
      return selectedChatData.firstname;
    }
  };
  const renderDirectMessages = (message) => {
    const isSender = message.sender === userInfo._id;
    return (
      <div>
        <div
          className={`${
            isSender ? " ml-auto mr-4 text-left items-end" : "ml-4  items-start"
          } group/items relative flex flex-col mt-4 justify-items w-fit max-w-[900px] min-w-0 
         `}
        >
          {message.reply && (
            <button className="flex border p-2 items-center space-x-4  ">
              <div className="flex">
                <img className="w-7" src={repliedIconFlip} alt=""></img>
                <p className="italic font-bold ">
                  {" "}
                  @{handleReplyName(message.reply.sender)}
                </p>
              </div>
              {message.reply.repliedText ? (
                <p className="text-sm text-[#F5DEB3] break-all max-h-10 max-w-[550px] line-clamp-2">
                  {message.reply.repliedText}
                </p>
              ) : isImage(message.reply.repliedFile) ? (
                <div className="w-10 h-10">
                  <img
                    className=" w-full h-full object-cover rounded-md"
                    src={`http://localhost:5000/uploads/files/${message.reply.repliedFile}`}
                    alt=""
                  ></img>
                </div>
              ) : (
                <div className="flex truncate space-x-2 items-center">
                  <img className="w-6" src={fileImage} alt=""></img>
                  <p className="max-w-96 truncate text-sm text-[#F5DEB3]">
                    {message.reply.repliedFile}
                  </p>
                </div>
              )}
            </button>
          )}

          {message.messageType === "text" && (
            <div className=" group/texts">
              {replyButton(
                message.content,
                message.sender,
                undefined,
                isSender
              )}
              {renderText(message.content, isSender, message._id)}
            </div>
          )}

          {message.messageType === "file" &&
            message.fileUrl.map((file) => {
              return (
                <div className=" group/files" key={uuidv4()}>
                  {replyButton(undefined, message.sender, file, isSender)}
                  {renderFile(file, isSender, message._id, message.isRecording)}
                </div>
              );
            })}

          {message.messageType === "combined" && (
            <div
              className={`flex flex-col ${
                isSender ? "items-end" : "items-start"
              }`}
            >
              {message.contentAndFile.files.map((file) => {
                return (
                  <div className=" group/files" key={uuidv4()}>
                    {replyButton(undefined, message.sender, file, isSender)}
                    {renderFile(
                      file,
                      isSender,
                      message._id,
                      message.isRecording
                    )}
                  </div>
                );
              })}
              <div className=" group/texts">
                {replyButton(
                  message.content,
                  message.sender,
                  undefined,
                  isSender
                )}
                {renderText(message.contentAndFile.text, isSender)}
              </div>
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
      </div>
    );
  };

  return (
    <>
      <div
        className=" flex flex-col w-full h-full  bg-[#0E0E10] overflow-auto scrollbar-hidden scrollbar-hidden::-webkit-scrollbar  pb-8"
        id="chat-box"
      >
        {renderMessages()}
        <div className="" ref={endRef}></div>
        {isFullScreen && (
          <div className="fixed flex justify-center items-center w-full inset-0 m-auto z-[2000]  backdrop-blur-lg">
            <div className="absolute top-5 left-1/2 -translate-x-1/2 flex space-x-5">
              <button
                className="flex justify-center items-center w-12 h-12 rounded-full bg-white/20"
                onClick={() => downloadFile(fullScreenParams)}
              >
                <img className="w-8 h-6" src={downloadIcon} alt=""></img>
              </button>
              <button
                className="flex justify-center items-center w-12 h-12 rounded-full bg-white/20"
                onClick={() => setIsFullScreen(false)}
              >
                <img className="w-5 h-5" src={closeIcon} alt=""></img>
              </button>
            </div>
            <img
              className="max-w-[850px] max-h-[850px] w-full object-contain"
              src={`http://localhost:5000/uploads/files/${fullScreenParams}`}
              alt=""
            ></img>
          </div>
        )}

        {isDownloading && (
          <div className="fixed flex justify-center items-center bottom-8 left-1/2 -translate-x-1/2  z-[3000] rounded-full px-5 py-3 bg-black">
            <img className="rounded-lg w-8" src={rasengan} alt=""></img>
            <div className="ml-4 text-lg">Downloading...</div>
          </div>
        )}
      </div>
    </>
  );
}
