import defaultImg from "../../images/default.jpeg";
import defaultImg2 from "../../images/windtunnel.jpg";
import block from "../../images/icons/block.png";
import cancel from "../../images/icons/cancel.png";
import settings from "../../images/icons/settingsblue.png";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef, useState } from "react";
import { useAppStore } from "../../store/index.js";
import MessageBar from "./MessageBar.jsx";
const SentMessage = ({ message, pageSize }) => {
  return (
    <div className="ml-auto flex flex-col mr-4 mt-4 justify-items text-left">
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
  const endRef = useRef("");
  useEffect(() => {
    endRef.current.scrollIntoView({ behaviour: "smooth" });
  }, []);
  const isTablet = useMediaQuery({ maxWidth: 1400 });
  const isSmall = useMediaQuery({ maxWidth: 1140 });
  const transitionPage = useMediaQuery({ maxWidth: 940 });

  const { selectedChatData, closeChat, userInfo, setActiveItem } =
    useAppStore();
  console.log(selectedChatData);
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
              src={`http://localhost:5000/uploads/profiles/${selectedChatData.image}`}
              alt=""
            ></img>
          </div>
          <div>
            <p className="font-semibold text-xl mx-auto">
              {selectedChatData
                ? selectedChatData.firstname + " " + selectedChatData.lastname
                : ""}
            </p>
          </div>
        </div>
        <div className="flex ml-10">
          <button
            className="w-5 pt-1"
            onClick={() => {
              closeChat();
              setActiveItem(undefined);
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
      <MessageBar isSmall={isSmall} isTablet={isTablet}></MessageBar>
    </div>
  );
}
