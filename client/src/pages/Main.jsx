import React, { useEffect } from "react";
import ChatPage from "./ChatPage";
import EmptyChat from "../components/EmptyChat/EmptyChat";
import Chat from "../components/Chat/Chat";
import Detail from "../components/Detail/Detail";
import MessageListContainer from "../components/MessageList/MessageListContainer";
import { useAppStore } from "../store";
import { useShallow } from "zustand/shallow";
import VideoCall from "../components/call/VideoCall";
import VoiceCall from "../components/call/VoiceCall";
import { useSocket } from "../use-contexts/socketContext";
import IncomingVideoCall from "../components/call/IncomingVideoCall";
import IncomingVoiceCall from "../components/call/IncomingVoiceCall";
export default function Main() {
  console.log("chat page container");
  const socket = useSocket();
  const { voiceCall, videoCall, incomingVoiceCall, incomingVideoCall } =
    useAppStore(
      useShallow((state) => ({
        voiceCall: state.voiceCall,
        videoCall: state.videoCall,
        incomingVoiceCall: state.incomingVoiceCall,
        incomingVideoCall: state.incomingVideoCall,
      }))
    );
  useEffect(() => {
    const setIncomingVoiceCall = useAppStore.getState().setIncomingVoiceCall;
    const setIncomingVideoCall = useAppStore.getState().setIncomingVideoCall;
    const endCall = useAppStore.getState().endCall;
    if (socket) {
      const incomingVoiceFunc = ({ from, roomId, callType }) => {
        setIncomingVoiceCall({ ...from, roomId, callType });
        console.log(from, roomId, callType);
      };
      const incomingVideoFunc = ({ from, roomId, callType }) => {
        setIncomingVideoCall({ ...from, roomId, callType });
      };
      const rejectCallFunc = () => {
        endCall();
      };
      socket.on("incoming-voice-call", incomingVoiceFunc);
      socket.on("incoming-video-call", incomingVideoFunc);
      socket.on("rejected-voice-call", rejectCallFunc);
      socket.on("rejected-video-call", rejectCallFunc);
      return () => {
        socket.off("incoming-voice-call", incomingVoiceFunc);
        socket.off("incoming-video-call", incomingVideoFunc);
        socket.off("rejected-voice-call", rejectCallFunc);
        socket.off("rejected-video-call", rejectCallFunc);
      };
    }
  }, [socket]);
  return (
    <>
      {incomingVideoCall && <IncomingVideoCall />}
      {incomingVoiceCall && <IncomingVoiceCall />}
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
