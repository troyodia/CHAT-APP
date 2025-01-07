import { useEffect, useRef, useState } from "react";
import uploadFile from "../../../images/icons/uploadfile.png";
import microphoneIcon from "../../../images/icons/microphone.png";
import emojiIcon from "../../../images/icons/emoji.png";
import Picker from "emoji-picker-react";
import { useAppStore } from "../../../store";
import { useSocket } from "../../../use-contexts/socketContext";
import axiosInstance from "../../../utils/axiosInstance";
import fileImage from "../../../images/icons/myfile.png";
import cancel from "../../../images/icons/cancelround.png";
import { useMediaQuery } from "react-responsive";
import { v4 as uuidv4 } from "uuid";
import AudioRecorder from "../AudioRecorder";
import { useShallow } from "zustand/shallow";
import { isImage } from "../../../utils/isImage";
import Emoji from "./Emoji";
import UploadFileButton from "./UploadFileButton";
import SendMessageButton from "./SendMessageButton";
export default function MessageBar() {
  console.log("message bar");
  const [displayEmojiPicker, setDisplayEmojiPicker] = useState(false);
  const socket = useSocket();
  const [userBlocked, setUserBlocked] = useState(false);
  const checkifBlockedUrl =
    "http://localhost:5000/api/v1/contact/checkifBlocked";
  const responsiveIcons = useMediaQuery({ maxWidth: 600 });

  const {
    selectedChatData,
    userInfo,
    removeFiles,
    audioRecordingMap,
    uploadedFilesMap,
    replyMap,
    blockedContacts,
    messageMap,
    setDisableReplyButton,
  } = useAppStore(
    useShallow((state) => ({
      selectedChatData: state.selectedChatData,
      userInfo: state.userInfo,
      setUploadedFiles: state.setUploadedFiles,
      removeFiles: state.removeFiles,
      audioRecordingMap: state.audioRecordingMap,
      uploadedFilesMap: state.uploadedFilesMap,
      replyMap: state.replyMap,
      blockedContacts: state.blockedContacts,
      messageMap: state.messageMap,
      setDisableReplyButton: state.setDisableReplyButton,
    }))
  );

  const handleDisplayEmojiPicker = (bool) => {
    setDisplayEmojiPicker(bool);
  };
  const handleReplyName = () => {
    if (
      replyMap.get(selectedChatData.id) !== undefined &&
      replyMap.get(selectedChatData.id) &&
      replyMap.get(selectedChatData.id).sender === userInfo._id
    ) {
      return userInfo.firstname;
    } else {
      return selectedChatData.firstname;
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    const handleCheckedifBlocked = async () => {
      try {
        const res = await axiosInstance.post(
          checkifBlockedUrl,
          { contact: selectedChatData.id },
          {
            withCredentials: true,
            signal: controller.signal,
          }
        );
        if (res.data && res.status === 200) {
          setUserBlocked(res.data.isBlocked);
          setDisableReplyButton(res.data.isBlocked);
        }
      } catch (error) {
        console.log(error?.response?.data?.msg);
      }
    };
    if (selectedChatData) {
      handleCheckedifBlocked();
    }
    return () => {
      controller.abort();
    };
  }, [selectedChatData, setDisableReplyButton]);
  useEffect(() => {
    if (socket && selectedChatData) {
      const handleBlockedStatus = (data) => {
        setUserBlocked(data);
        useAppStore.setState((prev) => ({
          uploadedFilesMap: new Map(prev.uploadedFilesMap).set(
            selectedChatData.id,
            []
          ),
        }));
        useAppStore.setState((prev) => ({
          replyMap: new Map(prev.replyMap).set(selectedChatData.id, undefined),
        }));
        useAppStore.setState((prev) => ({
          messageMap: new Map(prev.messageMap).set(selectedChatData.id, ""),
        }));
        useAppStore.setState((prev) => ({
          audioRecordingMap: new Map(prev.audioRecordingMap).set(
            selectedChatData.id,
            false
          ),
        }));
      };
      socket.on("update-block-status", handleBlockedStatus);
      return () => {
        socket.off("update-block-status", handleBlockedStatus);
      };
    }
  }, [socket, selectedChatData]);
  return (
    <div className="w-full  bg-[#0E0E10] ">
      {uploadedFilesMap.get(selectedChatData.id) !== undefined &&
        uploadedFilesMap.get(selectedChatData.id).length > 0 &&
        !audioRecordingMap.get(selectedChatData.id) && (
          <div className=" flex shrink bg-[#0E0E10] border max-w-80  gap-x-6 overflow-auto p-3 h-20">
            {uploadedFilesMap.get(selectedChatData.id).map((file) => {
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
                      removeFiles(file, selectedChatData.id);
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
                        removeFiles(file, selectedChatData.id);
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

      {(audioRecordingMap.get(selectedChatData.id) === undefined ||
        !audioRecordingMap.get(selectedChatData.id)) && (
        <div className="flex mt-auto   w-full items-center justify-center  py-4">
          <div
            className={`flex mr-auto space-x-3 ml-4 ${
              replyMap.get(selectedChatData.id) !== undefined &&
              replyMap.get(selectedChatData.id)
                ? "mt-9"
                : ""
            }`}
          >
            <UploadFileButton userBlocked={userBlocked} />
            {(messageMap.get(selectedChatData.id) === undefined ||
              !messageMap.get(selectedChatData.id)) &&
              (uploadedFilesMap.get(selectedChatData.id) === undefined ||
                uploadedFilesMap.get(selectedChatData.id).length < 1) && (
                <button
                  className={`w-7  hover:outline hover:outline-1 hover:outline-dashed ${
                    (blockedContacts.includes(selectedChatData.id) ||
                      userBlocked) &&
                    "cursor-not-allowed"
                  }`} //pt-1
                  onClick={() => {
                    useAppStore.setState((prev) => ({
                      audioRecordingMap: new Map(prev.audioRecordingMap).set(
                        selectedChatData.id,
                        true
                      ),
                    }));
                  }}
                >
                  <img src={microphoneIcon} alt=""></img>
                </button>
              )}
          </div>
          <div className="flex flex-col w-full">
            {replyMap.get(selectedChatData.id) !== undefined &&
              replyMap.get(selectedChatData.id) && (
                <div className="flex items-center ml-6 text-white text-lg italic bg-white/20 pl-2 py-1 rounded-md">
                  <button
                    onClick={() => {
                      useAppStore.setState((prev) => ({
                        replyMap: new Map(prev.replyMap).set(
                          selectedChatData.id,
                          undefined
                        ),
                      }));
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
            <div className="flex-1 ml-6 group relative">
              <input
                type="text"
                value={
                  messageMap.get(selectedChatData.id) !== undefined
                    ? messageMap.get(selectedChatData.id)
                    : ""
                }
                className={` w-full py-4 pl-4 bg-white/5 rounded-md outline-none text-lg 
            focus:outline focus:outline-3 focus:outline-dashed focus:outline-white min-w-2 ${
              (blockedContacts.includes(selectedChatData.id) || userBlocked) &&
              "cursor-not-allowed"
            }`}
                placeholder="Type a message"
                id="input"
                onChange={(e) => {
                  useAppStore.setState((prev) => ({
                    messageMap: new Map(prev.messageMap).set(
                      selectedChatData.id,
                      e.target.value
                    ),
                  }));
                }}
                disabled={
                  (blockedContacts &&
                    blockedContacts.includes(selectedChatData.id)) ||
                  userBlocked
                }
              ></input>
              {(blockedContacts.includes(selectedChatData.id) ||
                userBlocked) && (
                <span
                  className="justify-center text-center p-2 -top-14 left-1/2 -translate-x-1/2  
        text-sm text-black bg-white hidden group-hover:flex group-hover:justify-center absolute rounded-lg"
                >
                  {userBlocked &&
                  !blockedContacts.includes(selectedChatData.id) ? (
                    <span>
                      Cannot send any messages, you have been{" "}
                      <span className="font-semibold">Blocked</span> by{" "}
                      <span className=" capitalize font-semibold">
                        {selectedChatData.firstname}
                      </span>{" "}
                    </span>
                  ) : (
                    <span>
                      Cannot message a blocked contact, unblock{" "}
                      <span className=" capitalize font-semibold">
                        {selectedChatData.firstname}
                      </span>{" "}
                      to send them a message
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>
          <button
            className={`${
              responsiveIcons ? "mx-4" : "mx-7"
            } w-8 flex shrink-0 ${
              replyMap.get(selectedChatData.id) !== undefined &&
              replyMap.get(selectedChatData.id)
                ? "mt-9"
                : ""
            } ${
              (blockedContacts.includes(selectedChatData.id) || userBlocked) &&
              "cursor-not-allowed"
            }`}
            onClick={() => {
              setDisplayEmojiPicker(true);
            }}
          >
            <img src={emojiIcon} alt=""></img>
          </button>
          <SendMessageButton />
        </div>
      )}
      {audioRecordingMap.get(selectedChatData.id) !== undefined &&
        audioRecordingMap.get(selectedChatData.id) && (
          <div className="">
            {replyMap.get(selectedChatData.id) !== undefined &&
              replyMap.get(selectedChatData.id) && (
                <div className="flex items-center max-w-[250px] text-white text-lg italic bg-white/20 pl-2 py-1 rounded-tr-md">
                  <button
                    onClick={() => {
                      useAppStore.setState((prev) => ({
                        replyMap: new Map(prev.replyMap).set(
                          selectedChatData.id,
                          undefined
                        ),
                      }));
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
            <AudioRecorder></AudioRecorder>
          </div>
        )}

      <Emoji
        displayEmoji={displayEmojiPicker}
        setDisplayEmojiPicker={handleDisplayEmojiPicker}
      />
    </div>
  );
}
