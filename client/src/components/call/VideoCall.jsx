import React from "react";
import { lazy, Suspense } from "react";
import { useSocket } from "../../use-contexts/socketContext";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/shallow";
import { useEffect } from "react";
const Container = lazy(() => import("./Container"));
export default function VideoCall() {
  const socket = useSocket();
  const { videoCall, userInfo } = useAppStore(
    useShallow((state) => ({
      userInfo: state.userInfo,
      videoCall: state.videoCall,
    }))
  );
  useEffect(() => {
    const userInfo = useAppStore.getState().userInfo;
    if (videoCall && videoCall.type === "out-going" && socket) {
      socket.emit("outgoing-video-call", {
        to: videoCall.id,
        from: {
          id: userInfo._id,
          image: userInfo.image,
          firstname: userInfo.firstname,
          lastname: userInfo.lastname,
        },
        callType: videoCall.callType,
        roomId: videoCall.roomId,
      });
    }
  }, [videoCall, socket]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container data={videoCall} />
    </Suspense>
  );
}
