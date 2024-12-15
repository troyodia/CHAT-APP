import React from "react";
import closeIcon from "../../../images/icons/close.png";
import downloadIcon from "../../../images/icons/download.png";

import { useAppStore } from "../../../store";
import { useShallow } from "zustand/shallow";
export default function RenderFullScreen() {
  const { downloadFile, setIsFullScreen, fullScreenParams } = useAppStore(
    useShallow((state) => ({
      downloadFile: state.downloadFile,
      setIsFullScreen: state.setIsFullScreen,
      fullScreenParams: state.fullScreenParams,
    }))
  );
  return (
    <div className="fixed flex justify-center items-center w-full inset-0 m-auto z-[2000]  backdrop-blur-lg">
      <div className="absolute top-5 left-1/2 -translate-x-1/2 flex space-x-5">
        <button
          className="flex justify-center items-center w-12 h-12 rounded-full bg-white/20"
          onClick={() => downloadFile(fullScreenParams)}
        >
          <img className="w-8 h-6" src={downloadIcon} alt=""></img>
        </button>
        <button
          className="flex justify-center items-center w-12 h-12 rounded-full bg-white/20"
          onClick={() => setIsFullScreen(false)}
        >
          <img className="w-5 h-5" src={closeIcon} alt=""></img>
        </button>
      </div>
      <img
        className="max-w-[850px] max-h-[850px] w-full object-contain"
        src={`http://localhost:5000/uploads/files/${fullScreenParams}`}
        alt=""
      ></img>
    </div>
  );
}
