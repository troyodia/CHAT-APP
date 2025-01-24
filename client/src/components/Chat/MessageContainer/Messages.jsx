import React from "react";
import MessageContainer from "./MessageContainer";
import RenderMessages from "./RenderMessages";
import RenderFullScreen from "./RenderFullScreen";
export default function Messages() {
  return (
    <MessageContainer
      renderMessages={<RenderMessages />}
      renderFullScreen={<RenderFullScreen />}
    />
  );
}
