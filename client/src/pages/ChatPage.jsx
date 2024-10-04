import Chat from "../components/Chat";
import Detail from "../components/Detail";
import MessageList from "../components/MessageList/MessageList";

export default function ChatPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-cover bg-[url('./images/background.jpg')]">
      <div className="mx-2 flex w-[1800px] h-[850px] bg-black/30 backdrop-blur-md rounded text-white">
        <MessageList></MessageList>
        <Chat></Chat>
        <Detail></Detail>
      </div>
    </div>
  );
}
