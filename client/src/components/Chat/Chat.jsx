import block from "../../images/icons/block.png";
import cancel from "../../images/icons/cancel.png";
import settings from "../../images/icons/settingsblue.png";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef, useState } from "react";
import { useAppStore } from "../../store/index.js";
import MessageBar from "./MessageBar.jsx";
import MessageContainer from "./MessageContainer.jsx";

export default function Chat({ updateSettings }) {
  const endRef = useRef("");
  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behaviour: "smooth" });
  }, []);
  const isTablet = useMediaQuery({ maxWidth: 1400 });
  const isSmall = useMediaQuery({ maxWidth: 1140 });
  const transitionPage = useMediaQuery({ maxWidth: 940 });

  const {
    selectedChatData,
    closeChat,
    userInfo,
    setActiveItem,
    selectedChatMessages,
  } = useAppStore();
  useEffect(() => {
    console.log(selectedChatMessages);
  }, [selectedChatMessages]);

  return (
    <div
      className={`flex-1 flex-col relative  ${
        transitionPage ? "hidden" : "flex"
      } `}
    >
      <div className="flex h-28 w-full items-center">
        <div className="flex items-center">
          <div className="w-16 h-16 ml-8 mr-4">
            {selectedChatData ? (
              <img
                className="w-16 h-16 rounded-lg object-cover"
                src={`http://localhost:5000/uploads/profiles/${selectedChatData.image}`}
                alt=""
              ></img>
            ) : (
              ""
            )}
          </div>
          <div>
            <p className="font-semibold text-xl mx-auto capitalize">
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

      <MessageContainer
        isSmall={isSmall}
        isTablet={isTablet}
      ></MessageContainer>
      <div className="" ref={endRef}></div>

      <MessageBar isSmall={isSmall} isTablet={isTablet}></MessageBar>
    </div>
  );
}
