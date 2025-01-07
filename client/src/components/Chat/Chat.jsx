import MessageBar from "./MessageBar/MessageBar.jsx";
import ChatHeader from "./ChatHeader.jsx";
import Messages from "./MessageContainer/Messages.jsx";
import ChatContainer from "./ChatContainer.jsx";

export default function Chat() {
  return (
    <ChatContainer
      header={<ChatHeader />}
      messages={<Messages />}
      messageBar={<MessageBar />}
    />
  );
}
