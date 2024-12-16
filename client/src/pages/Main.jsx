import React from "react";
import ChatPage from "./ChatPage";
import EmptyChat from "../components/EmptyChat/EmptyChat";
import Chat from "../components/Chat/Chat";
import Detail from "../components/Detail/Detail";
import MessageList from "../components/MessageList/MessageList";
import MessageListContainer from "../components/MessageList/MessageListContainer";
import { useAppStore } from "../store";
import { useShallow } from "zustand/shallow";
import VideoCall from "../components/call/VideoCall";
import VoiceCall from "../components/call/VoiceCall";
export default function Main() {
  console.log("chat page container");
  const {
    // selectedChatData,
    // setActiveItem,
    // closeChat,
    // setToggleSettings,
    voiceCall,
    videoCall,
    incomingVoiceCall,
    incomingVideoCall,
  } = useAppStore(
    useShallow((state) => ({
      // selectedChatData: state.selectedChatData,
      // setActiveItem: state.setActiveItem,
      // closeChat: state.closeChat,
      // setToggleSettings: state.setToggleSettings,
      voiceCall: state.voiceCall,
      videoCall: state.videoCall,
      incomingVoiceCall: state.incomingVoiceCall,
      incomingVideoCall: state.incomingVideoCall,
    }))
  );
  return (
    <>
      {videoCall && (
        <div className="flex flex-col w-screen h-screen bg-[#0E0E10]">
          <VideoCall />
        </div>
      )}
      {voiceCall && (
        <div className="flex flex-col w-screen h-screen bg-[#0E0E10]">
          <VoiceCall />
        </div>
      )}

      {!videoCall && !voiceCall && (
        <ChatPage
          emptyChat={<EmptyChat />}
          chat={<Chat />}
          detail={<Detail />}
          messageList={<MessageListContainer />}
        />
      )}
    </>
  );
}
