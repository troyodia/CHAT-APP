import defaultImg from "../../images/default.jpeg";
import defaultImg2 from "../../images/windtunnel.jpg";
import cameraIcon from "../../images/icons/camera.png";
import phoneIcon from "../../images/icons/phone.png";
import infoIcon from "../../images/icons/i-icon.png";
import picIcon from "../../images/icons/picture.png";
import cameraFooterIcon from "../../images/icons/camerafooter.png";
import microphoneIcon from "../../images/icons/microphone.png";
import emojiIcon from "../../images/icons/emoji.png";
import block from "../../images/icons/block.png";
import cancel from "../../images/icons/cancel.png";
import settings from "../../images/icons/settingsblue.png";
import Picker from "emoji-picker-react";
import { io } from "socket.io-client";
import { useMediaQuery } from "react-responsive";
import { UserState } from "../../use-contexts/userContext.jsx";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/index.js";
const SentMessage = ({ message, pageSize }) => {
  return (
    <div className="ml-auto flex flex-col mr-4 mt-4 justify-items text-left">
      {/* <div className="text-left"> */}
      <p
        className={`p-4 border border-solid flex border-sky-600 ${
          pageSize.isSmall
            ? "w-[450px]"
            : pageSize.isTablet
            ? "w-[500px]"
            : "w-[700px]"
        }
         text-black bg-[#00eeff] rounded-xl`}
      >
        {message}{" "}
      </p>
      <div className="mt-1 flex">55 min ago</div>
      {/* </div> */}
    </div>
  );
};
const RecievedMessage = ({ message, pageSize }) => {
  return (
    <div className="mr-auto flex ml-4 mt-4 justify-items">
      <div className="w-12 h-12 mr-5">
        <img
          className="w-12 h-12 rounded-lg object-cover"
          src={defaultImg}
          alt=""
        ></img>
      </div>
      <div className="text-left  ">
        <p
          className={`p-4 border border-solid border-white/30 bg-white/10 flex 
        rounded-xl ${
          pageSize.isSmall
            ? "w-[450px]"
            : pageSize.isTablet
            ? "w-[500px]"
            : "w-[700px]"
        }`}
        >
          {message}
        </p>
        <div className="mt-1">55 min ago</div>
      </div>
    </div>
  );
};

export default function Chat({ updateSettings }) {
  const [display, setDisplay] = useState(false);
  const [message, setMessage] = useState("");
  const endRef = useRef("");
  const user = UserState();
  useEffect(() => {
    endRef.current.scrollIntoView({ behaviour: "smooth" });
  }, []);
  const isTablet = useMediaQuery({ maxWidth: 1400 });
  const isSmall = useMediaQuery({ maxWidth: 1140 });
  const transitionPage = useMediaQuery({ maxWidth: 940 });

  const { selectedChatMessages, closeChat, userInfo } = useAppStore();

  console.log(userInfo);
  return (
    <div
      className={`flex-1 flex-col relative  ${
        transitionPage ? "hidden" : "flex"
      } `}
    >
      <div className="flex h-28 w-full items-center">
        <div className="flex items-center">
          <div className="w-16 h-16 ml-8 mr-4">
            <img
              className="w-16 h-16 rounded-lg object-cover"
              src={defaultImg}
              alt=""
            ></img>
          </div>
          <div>
            <p className="font-semibold text-xl mx-auto">Jane Doe</p>
          </div>
        </div>
        <div className="flex ml-10">
          <button
            className="w-5 pt-1"
            onClick={() => {
              closeChat();
            }}
          >
            <img src={cancel} alt=""></img>
          </button>
        </div>
        <div className="flex mr-8 ml-auto">
          <button className="w-8">
            <img src={block} alt=""></img>
          </button>
        </div>
        <div className="flex mr-8 ">
          <button className="w-9" onClick={updateSettings}>
            <img src={settings} alt=""></img>
          </button>
        </div>
      </div>
      <div
        className="flex flex-col w-full h-full  bg-[#0E0E10] overflow-auto scrollbar-hidden scrollbar-hidden::-webkit-scrollbar"
        id="chat-box"
      >
        <div
          className={`ml-auto mt-4 mr-4 ${
            isTablet ? "max-w-[700px] h-[450px]" : "max-w-[700px] h-[550px]"
          } flex`}
        >
          <img
            className="rounded-3xl w-full h-full object-cover"
            src={defaultImg2}
            alt=""
          ></img>
        </div>

        <SentMessage
          message={`It was popularised in the 1960s with the release of Letraset
                    sheets containing Lorem Ipsum passages, and more recently with
                    desktop publishing software like Aldus PageMaker including
                    versions of Lorem Ipsum thththth.`}
          pageSize={{ isTablet, isSmall }}
        ></SentMessage>
        <RecievedMessage
          message={`It was popularised in the 1960s with the release of Letraset
                    sheets containing Lorem Ipsum passages, and more recently with
                    desktop publishing software like Aldus PageMaker including
                    versions of Lorem Ipsum thththth.`}
          pageSize={{ isTablet, isSmall }}
        ></RecievedMessage>
        <div className="min-h-10" ref={endRef}></div>
      </div>

      <div className="flex mt-auto h-32 border-0 w-full items-center bg-[#0E0E10]">
        <div className="flex mr-auto space-x-3 ml-4">
          <button className="w-8 pt-1">
            <img src={picIcon} alt=""></img>
          </button>
          <button className="w-6 pt-1">
            <img src={cameraFooterIcon} alt=""></img>
          </button>
          <button className="w-7 pt-1">
            <img src={microphoneIcon} alt=""></img>
          </button>
        </div>
        <input
          type="text"
          value={message}
          className="ml-8 flex-1 py-4 pl-4 bg-white/10 rounded-md outline-none text-lg 
          focus:border focus:border-solid focus:border-white/30 min-w-2"
          placeholder="Type a message"
          id="input"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></input>
        <button
          className="mx-7 w-8 pt-1"
          onClick={() => {
            setDisplay((prev) => !prev);
          }}
        >
          <img src={emojiIcon} alt=""></img>
        </button>
        <button
          className={`flex text-black ml-auto mr-4 bg-[#00eeff] justify-center rounded ${
            isSmall
              ? "text-lg px-5 py-2"
              : isTablet
              ? "text-lg px-6 py-3"
              : "text-xl px-7 py-4"
          } 
          font-bold hover:opacity-80`}
        >
          Send
        </button>
      </div>
      <div className="absolute bottom-24 right-32">
        <Picker
          open={display}
          onEmojiClick={(emojiData, event) => {
            let pos = document.getElementById("input").selectionStart;
            setMessage(
              (prev) => prev.slice(0, pos) + emojiData.emoji + prev.slice(pos)
            );
            setDisplay(!display);
          }}
        ></Picker>
      </div>
    </div>
  );
}
