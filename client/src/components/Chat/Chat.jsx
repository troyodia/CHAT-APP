import { useMediaQuery } from "react-responsive";
import MessageBar from "./MessageBar/MessageBar.jsx";
import ChatHeader from "./ChatHeader.jsx";
import Messages from "./MessageContainer/Messages.jsx";

export default function Chat() {
  const transitionPage = useMediaQuery({ maxWidth: 940 });
  return (
    <div
      className={`flex-1 flex-col relative  ${
        transitionPage ? "hidden" : "flex"
      } `}
    >
      <ChatHeader></ChatHeader>
      <Messages></Messages>

      <MessageBar></MessageBar>
    </div>
  );
}
