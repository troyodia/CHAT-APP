import React from "react";
import { lazy, Suspense } from "react";
import { useSocket } from "../../use-contexts/socketContext";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/shallow";

const Container = lazy(() => import("./Container"));
export default function VideoCall() {
  const socket = useSocket();
  const { videoCall, userInfo } = useAppStore(
    useShallow((state) => ({
      userInfo: state.userInfo,
      videoCall: state.videoCall,
    }))
  );
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container data={videoCall} />
    </Suspense>
  );
}
