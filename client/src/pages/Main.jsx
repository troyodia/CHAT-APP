import React, { useEffect } from "react";
import ChatPage from "./ChatPage";
import EmptyChat from "../components/EmptyChat/EmptyChat";
import Chat from "../components/Chat/Chat";
import Detail from "../components/Detail/Detail";
import MessageListContainer from "../components/MessageList/MessageListContainer";
export default function Main() {
  return (
    <ChatPage
      emptyChat={<EmptyChat />}
      chat={<Chat />}
      detail={<Detail />}
      messageList={<MessageListContainer />}
    />
  );
}
