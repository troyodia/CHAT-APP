import React from "react";
import ChatPage from "./ChatPage";
import EmptyChat from "../components/EmptyChat/EmptyChat";
import Chat from "../components/Chat/Chat";
import Detail from "../components/Detail/Detail";
import MessageList from "../components/MessageList/MessageList";
export default function ChatPageContainer() {
  console.log("chat page container");
  return (
    <ChatPage
      emptyChat={<EmptyChat />}
      chat={<Chat />}
      detail={<Detail />}
      messageList={<MessageList />}
    />
  );
}
