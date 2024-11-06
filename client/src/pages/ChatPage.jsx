import { useState } from "react";
import Chat from "../components/Chat/Chat";
import Detail from "../components/Detail/Detail";
import MessageList from "../components/MessageList/MessageList";
import EmptyChat from "../components/EmptyChat/EmptyChat";

export default function ChatPage() {
  const [settings, setSettings] = useState(false);
  const [displayEmptyChat, setDisplayEmptyChat] = useState(true);
  const displayToggle = (bool) => {
    // setDisplayEmptyChat((prev) => !prev);
    setDisplayEmptyChat(bool);
  };
  const updateSettings = () => {
    setSettings((prev) => !prev);
  };
  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className=" w-full h-screen flex bg-black/30 text-white">
        <MessageList displayToggle={displayToggle}></MessageList>
        {displayEmptyChat && <EmptyChat></EmptyChat>}
        {!displayEmptyChat && (
          <Chat
            updateSettings={updateSettings}
            displayToggle={displayToggle}
          ></Chat>
        )}

        {settings ? <Detail></Detail> : ""}
      </div>
    </div>
  );
}
