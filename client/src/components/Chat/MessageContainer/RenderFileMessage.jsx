import React, { Suspense, lazy } from "react";
import fileImage from "../../../images/icons/myfile.png";
import downloadIcon from "../../../images/icons/download.png";
import { isImage } from "../../../utils/isImage";
import { useAppStore } from "../../../store";
import { useShallow } from "zustand/shallow";
import { useMediaQuery } from "react-responsive";
import { AWS_BASE_FILE_PATH } from "../../../utils/URLS";
const VoiceMessage = lazy(() => import("./VoiceMessage"));

export default function RenderFileMessage({ file, isSender, isRecording }) {
  const { downloadFile, setIsFullScreen, setFullScreenParams } = useAppStore(
    useShallow((state) => ({
      downloadFile: state.downloadFile,
      setIsFullScreen: state.setIsFullScreen,
      setFullScreenParams: state.setFullScreenParams,
    }))
  );
  const responsiveImageSize = useMediaQuery({ maxWidth: 600 });

  return (
    <>
      {isImage(file) && (
        <div className="mb-2 relative group/images">
          <button
            onClick={() => {
              setIsFullScreen(true);
              setFullScreenParams(file);
            }}
          >
            <img
              className={`${
                isSender ? "border-sky-500 " : "border-white/30"
              } rounded-3xl ${
                responsiveImageSize
                  ? "max-w-[280px] max-h-[280px]"
                  : "max-w-[350px] max-h-[350px]"
              } object-contain border border-solid cursor-pointer`}
              src={`${AWS_BASE_FILE_PATH}/messagefiles/${file}`}
              alt=""
            ></img>
          </button>
          <button
            className="absolute top-2 right-2 flex  items-center justify-center w-10 h-10 rounded-full bg-black invisible group-hover/images:visible"
            onClick={() => downloadFile(file)}
          >
            <img className="w-8 ml-0.5" src={downloadIcon} alt=""></img>
          </button>
        </div>
      )}
      {isRecording && (
        <Suspense fallback={<div>loading..</div>}>
          <VoiceMessage file={file} isSender={isSender}></VoiceMessage>
        </Suspense>
      )}
      {!isImage(file) && !isRecording && (
        <div
          className={`flex items-center justify-between border border-solid rounded-md px-6 py-2  ${
            responsiveImageSize ? "w-[220px] space-x-3" : "w-[300px] space-x-4"
          } bg-white/10 mb-2 ${
            isSender ? "border-sky-500 " : "border-white/30"
          }`}
        >
          <div className="flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-black/60">
            <img className="w-6" src={fileImage} alt=""></img>
          </div>
          <div
            className={`${
              responsiveImageSize ? "w-[90px] text-base" : "w-[150px] text-lg"
            }  text-[#F5DEB3] break-all line-clamp-3`}
          >
            {file}
          </div>
          <button
            className="flex items-center shrink-0 justify-center w-10 h-10 rounded-full bg-black/60"
            onClick={() => downloadFile(file)}
          >
            <img className="w-8" src={downloadIcon} alt=""></img>
          </button>
        </div>
      )}
    </>
  );
}
