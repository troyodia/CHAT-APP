import { useEffect, useState } from "react";
import Chat from "../components/Chat/Chat";
import Detail from "../components/Detail/Detail";
import MessageList from "../components/MessageList/MessageList";
import EmptyChat from "../components/EmptyChat/EmptyChat";
import { useAppStore } from "../store";

export default function ChatPage() {
  const [settings, setSettings] = useState(false);

  const updateSettings = () => {
    setSettings((prev) => !prev);
  };
  const { selectedChatType, fetchData, userInfo } = useAppStore();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className=" w-full h-screen flex bg-black/30 text-white">
        <MessageList></MessageList>
        {!selectedChatType && <EmptyChat></EmptyChat>}
        {selectedChatType && <Chat updateSettings={updateSettings}></Chat>}
        {settings ? <Detail></Detail> : ""}
      </div>
    </div>
  );
}
