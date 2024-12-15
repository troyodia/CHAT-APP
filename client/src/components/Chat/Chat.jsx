import block from "../../images/icons/block.png";
import cancel from "../../images/icons/cancel.png";
import settings from "../../images/icons/settingsblue.png";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef, useState } from "react";
import { useAppStore } from "../../store/index.js";
import MessageBar from "./MessageBar.jsx";
import MessageContainer from "./MessageContainer/MessageContainer.jsx";
import ChatHeader from "./ChatHeader.jsx";
import Messages from "./MessageContainer/Messages.jsx";

export default function Chat() {
  console.log("parent chat");
  const endRef = useRef("");
  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behaviour: "smooth" });
  }, []);
  const isTablet = useMediaQuery({ maxWidth: 1400 });
  const isSmall = useMediaQuery({ maxWidth: 1140 });
  const transitionPage = useMediaQuery({ maxWidth: 940 });

  // const {
  //   selectedChatData,
  //   closeChat,
  //   userInfo,
  //   setActiveItem,
  //   selectedChatMessages,
  // } = useAppStore();
  // useEffect(() => {
  //   console.log(selectedChatMessages);
  // }, [selectedChatMessages]);

  return (
    <div
      className={`flex-1 flex-col relative  ${
        transitionPage ? "hidden" : "flex"
      } `}
    >
      <ChatHeader></ChatHeader>
      {/* <MessageContainer></MessageContainer> */}
      <Messages></Messages>
      <div className="" ref={endRef}></div>

      <MessageBar></MessageBar>
    </div>
  );
}
