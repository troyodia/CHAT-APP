import { useState } from "react";
import Chat from "../components/Chat/Chat";
import Detail from "../components/Detail/Detail";
import MessageList from "../components/MessageList/MessageList";

export default function ChatPage() {
  const [settings, setSettings] = useState(false);
  const updateSettings = () => {
    setSettings((prev) => !prev);
  };
  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className=" w-full h-screen flex bg-black/30 backdrop-blur-md rounded text-white">
        <MessageList></MessageList>
        <Chat updateSettings={updateSettings}></Chat>

        {settings ? <Detail></Detail> : ""}
      </div>
    </div>
  );
}
