import { useEffect, useRef, useState } from "react";
import uploadFile from "../../images/icons/uploadfile.png";
import cameraFooterIcon from "../../images/icons/camerafooter.png";
import microphoneIcon from "../../images/icons/microphone.png";
import emojiIcon from "../../images/icons/emoji.png";
import Picker from "emoji-picker-react";
import { useAppStore } from "../../store";
import { useSocket } from "../../use-contexts/socketContext";
import axiosInstance from "../../utils/axiosInstance";
import defaultImage from "../../images/default.png";
import fileImage from "../../images/icons/myfile.png";
import cancel from "../../images/icons/cancelround.png";
import { useMediaQuery } from "react-responsive";
import { v4 as uuidv4 } from "uuid";
import AudioRecorder from "./AudioRecorder";
import { useShallow } from "zustand/shallow";
import { isImage } from "../../utils/isImage";
export default function MessageBar() {
  console.log("message bar");
  const emojiRef = useRef(null);
  const fileUploadRef = useRef(null);
  const [displayEmojiPicker, setDisplayEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [showRecorder, setShowRecorder] = useState(false);
  const isTablet = useMediaQuery({ maxWidth: 1400 });
  const isSmall = useMediaQuery({ maxWidth: 1140 });

  const {
    selectedChatType,
    selectedChatData,
    userInfo,
    setUploadedFiles,
    uploadedFiles,
    removeFiles,
    reply,
    setReply,
    isFile,
    setIsFile,
  } = useAppStore(
    useShallow((state) => ({
      selectedChatType: state.selectedChatType,
      selectedChatData: state.selectedChatData,
      userInfo: state.userInfo,
      setUploadedFiles: state.setUploadedFiles,
      uploadedFiles: state.uploadedFiles,
      removeFiles: state.removeFiles,
      reply: state.reply,
      setReply: state.setReply,
      isFile: state.isFile,
      setIsFile: state.setIsFile,
    }))
  );
  const socket = useSocket();

  const url = "http://localhost:5000/api/v1/messages/uploadFile";

  const handleSendMessage = () => {
    if (selectedChatType === "contact") {
      if (message && uploadedFiles.length < 1) {
        socket?.emit("sendMessage", {
          sender: userInfo._id,
          recipient: selectedChatData.id,
          content: message,
          messageType: "text",
          fileUrl: undefined,
          contentAndFile: undefined,
          reply: reply ? reply : undefined,
        });
      }
      if (!message && uploadedFiles.length > 0) {
        socket?.emit("sendMessage", {
          sender: userInfo._id,
          recipient: selectedChatData.id,
          content: undefined,
          messageType: "file",
          fileUrl: uploadedFiles,
          contentAndFile: undefined,
          reply: reply ? reply : undefined,
        });
      }
      if (message && uploadedFiles.length > 0) {
        socket?.emit("sendMessage", {
          sender: userInfo._id,
          recipient: selectedChatData.id,
          content: undefined,
          messageType: "combined",
          fileUrl: undefined,
          contentAndFile: {
            text: message,
            files: uploadedFiles,
          },
          reply: reply ? reply : undefined,
        });
      }
    }
    setReply(undefined);
    setMessage("");
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setDisplayEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);
  const handleEmoji = (emojiData) => {
    let pos = document.getElementById("input").selectionStart;

    setMessage(
      (prev) => prev.slice(0, pos) + emojiData.emoji + prev.slice(pos)
    );
  };
  const handleFileAttachementClick = (e) => {
    e.preventDefault();

    if (fileUploadRef.current) {
      fileUploadRef.current.click();
      setIsFile(true);
    }
  };
  const handleFileUpload = async () => {
    const file = fileUploadRef.current.files[0];
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    } else {
      console.log("no file");
    }
    try {
      const res = await axiosInstance.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data && res.status === 200) {
        console.log(res.data.filePath);
        setUploadedFiles([...uploadedFiles, res.data.filePath]);
      }
    } catch (error) {
      console.log(error?.response?.data?.msg);
    }
  };
  const handleReplyName = () => {
    if (reply && reply.id === userInfo._id) {
      return userInfo.firstname;
    } else {
      return selectedChatData.firstname;
    }
  };
  const displayAudioRecorder = () => {
    setShowRecorder(false);
  };
  return (
    <div className="w-full  bg-[#0E0E10] ">
      {uploadedFiles.length > 0 && isFile && !showRecorder && (
        <div className=" flex shrink bg-[#0E0E10] w-[600px] gap-x-6 overflow-auto p-3 h-20">
          {uploadedFiles.map((file) => {
            return isImage(file) ? (
              <div className="w-14  relative flex shrink-0 " key={uuidv4()}>
                <img
                  className="rounded-lg  w-full object-cover"
                  src={`http://localhost:5000/uploads/files/${file}`}
                  alt=""
                ></img>
                <button
                  className="absolute -top-4 -right-4"
                  onClick={() => {
                    removeFiles(file);
                  }}
                >
                  <img className=" w-6" src={cancel} alt=""></img>
                </button>
              </div>
            ) : (
              <div
                className="relative bg-white/30 w-44 p-1 flex items-center"
                key={uuidv4()}
              >
                <img className="w-7" src={fileImage} alt=""></img>

                <div className="flex flex-col truncate ml-2">
                  <p className="text-xs truncate">{file}</p>
                  <p className="text-xs text-gray-300">PDF</p>
                  <button
                    className="absolute -top-4 -right-4"
                    onClick={() => {
                      removeFiles(file);
                    }}
                  >
                    <img className=" w-6 " src={cancel} alt=""></img>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {!showRecorder && (
        <div className="flex mt-auto   w-full items-center justify-center  py-4">
          <div className={`flex mr-auto space-x-3 ml-4 ${reply ? "mt-9" : ""}`}>
            <form className="">
              <button
                type="submit"
                className={`w-8 `} //pt-3
                onClick={handleFileAttachementClick}
              >
                <img
                  className="p-1 hover:outline hover:outline-1 hover:outline-dashed"
                  src={uploadFile}
                  alt=""
                ></img>
              </button>
              <input
                type="file"
                hidden
                ref={fileUploadRef}
                onChange={handleFileUpload}
              ></input>
            </form>
            <button
              className={`w-6 `} //pt-1
            >
              <img src={cameraFooterIcon} alt=""></img>
            </button>
            {!message && uploadedFiles.length < 1 && (
              <button
                className={`w-7  hover:outline hover:outline-1 hover:outline-dashed`} //pt-1
                onClick={() => {
                  setShowRecorder(true);
                }}
              >
                <img src={microphoneIcon} alt=""></img>
              </button>
            )}
          </div>
          <div className="flex flex-col w-full ">
            {reply && (
              <div className="flex items-center ml-8 text-white text-lg italic bg-white/20 pl-2 py-1 rounded-md">
                <button
                  onClick={() => {
                    setReply(undefined);
                  }}
                >
                  <img className="w-6 mr-2" src={cancel} alt=""></img>
                </button>
                <div>
                  Replying to{" "}
                  <span className="text-[#F5DEB3]">{handleReplyName()}</span>
                </div>
              </div>
            )}

            <input
              type="text"
              value={message}
              className="ml-8 flex-1 py-4 pl-4 bg-white/5 rounded-md outline-none text-lg 
            focus:outline focus:outline-3 focus:outline-dashed focus:outline-white min-w-2 "
              placeholder="Type a message"
              id="input"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></input>
          </div>
          <button
            // className={`mx-7 w-8 ${"pt-14"} pt-1`}
            className={`mx-7 w-8 flex shrink-0 ${reply ? "mt-9" : ""} `}
            onClick={() => {
              setDisplayEmojiPicker(true);
            }}
          >
            <img src={emojiIcon} alt=""></img>
          </button>
          <button
            className={`flex text-black ml-auto mr-4 justify-center rounded ${
              isSmall
                ? "text-lg px-5 py-2"
                : isTablet
                ? "text-lg px-6 py-3"
                : "text-xl px-7 py-4"
            } ${
              message || uploadedFiles.length > 0
                ? "  hover:outline-dashed hover:outline-3 hover:outline-offset-4 hover:outline-cyan-300 bg-[#00eeff]"
                : "bg-gray-800 cursor-not-allowed"
            } ${reply ? "mt-9" : ""}
          font-bold `}
            onClick={() => {
              if (message || uploadedFiles.length > 0) handleSendMessage();
              setIsFile(false);
              setUploadedFiles([]);
            }}
          >
            Send
          </button>
        </div>
      )}
      {showRecorder && (
        <AudioRecorder showRecorder={displayAudioRecorder}></AudioRecorder>
      )}
      <div className="absolute bottom-24 right-32 z-10" ref={emojiRef}>
        <Picker
          open={displayEmojiPicker}
          theme="dark"
          autoFocusSearch={true}
          onEmojiClick={(emojiData, event) => {
            handleEmoji(emojiData);
          }}
        ></Picker>
      </div>

      {/* </div> */}
    </div>
  );
}
