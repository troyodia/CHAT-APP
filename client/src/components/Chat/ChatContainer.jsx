import React from "react";
import { useAppStore } from "../../store";
import { shallow } from "zustand/shallow";
import { useMediaQuery } from "react-responsive";
export default function ChatContainer({ header, messages, messageBar }) {
  const toggleSettings = useAppStore((state) => state.toggleSettings, shallow);
  const hideChatScreenSize = useMediaQuery({ maxWidth: 810 });

  return (
    <div
      className={` flex-1 flex-col relative h-screen ${
        hideChatScreenSize && toggleSettings ? "hidden" : "flex"
      }  `}
    >
      {header}
      {messages}
      {messageBar}
    </div>
  );
}
