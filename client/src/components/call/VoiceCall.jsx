import React from "react";
import { lazy, Suspense } from "react";
import { useSocket } from "../../use-contexts/socketContext";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/shallow";

const Container = lazy(() => import("./Container"));
export default function VoiceCall() {
  const socket = useSocket();
  const { voiceCall, userInfo } = useAppStore(
    useShallow((state) => ({
      userInfo: state.userInfo,
      voiceCall: state.voiceCall,
    }))
  );
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container data={voiceCall} />
    </Suspense>
  );
}
