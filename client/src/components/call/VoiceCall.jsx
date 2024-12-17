import React, { useEffect } from "react";
import { lazy, Suspense } from "react";
import { useSocket } from "../../use-contexts/socketContext";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/shallow";

const Container = lazy(() => import("./Container"));
export default function VoiceCall() {
  const socket = useSocket();

  const { voiceCall } = useAppStore(
    useShallow((state) => ({
      voiceCall: state.voiceCall,
    }))
  );
  console.log(voiceCall);
  useEffect(() => {
    const userInfo = useAppStore.getState().userInfo;
    console.log(userInfo);
    if (voiceCall && voiceCall.type === "out-going" && socket) {
      socket.emit("outgoing-voice-call", {
        to: voiceCall.id,
        from: {
          id: userInfo._id,
          image: userInfo.image,
          firstname: userInfo.firstname,
          lastname: userInfo.lastname,
        },
        callType: voiceCall.callType,
        roomId: voiceCall.roomId,
      });
    }
  }, [voiceCall, socket]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container data={voiceCall} />
    </Suspense>
  );
}
