import React from "react";
import fileImage from "../../../images/icons/myfile.png";
import downloadIcon from "../../../images/icons/download.png";
import { isImage } from "../../../utils/isImage";
// import { useState } from "react";
import { useAppStore } from "../../../store";
import { useShallow } from "zustand/shallow";
import axios from "axios";
import { Suspense } from "react";
import { lazy } from "react";
const VoiceMessage = lazy(() => import("./VoiceMessage"));

export default function RenderFileMessage({ file, isSender, id, isRecording }) {
  console.log("render file messages");

  const { downloadFile, setIsFullScreen, setFullScreenParams } = useAppStore(
    useShallow((state) => ({
      downloadFile: state.downloadFile,
      setIsFullScreen: state.setIsFullScreen,
      setFullScreenParams: state.setFullScreenParams,
    }))
  );
  return (
    <>
      {isImage(file) && (
        <div className="mb-2 relative group/images">
          <img
            className={`${
              isSender ? "border-sky-500 " : "border-white/30"
            } rounded-3xl max-w-[600px] max-h-[600px] object-contain border border-solid cursor-pointer`}
            src={`http://localhost:5000/uploads/files/${file}`}
            alt=""
            onClick={() => {
              setIsFullScreen(true);
              setFullScreenParams(file);
            }}
          ></img>
          <button
            className="absolute top-2 right-2 flex  items-center justify-center w-10 h-10 rounded-full bg-black invisible group-hover/images:visible"
            onClick={() => downloadFile(file)}
          >
            <img className="w-8 ml-0.5" src={downloadIcon} alt=""></img>
          </button>
        </div>
      )}
      {isRecording && (
        // {childern}
        // <div></div>
        <Suspense fallback={<div>loading..</div>}>
          <VoiceMessage file={file} isSender={isSender}></VoiceMessage>
        </Suspense>
      )}
      {!isImage(file) && !isRecording && (
        <div
          className={`flex items-center justify-between border border-solid rounded-md p-6 w-[350px] bg-white/10 mb-2 ${
            isSender ? "border-sky-500 " : "border-white/30"
          }`}
        >
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-black/60">
            <img className="w-8" src={fileImage} alt=""></img>
          </div>
          <div className=" w-[150px] text-lg text-[#F5DEB3] break-all">
            {file}
          </div>
          <button
            className="flex items-center justify-center w-14 h-14 rounded-full bg-black/60"
            onClick={() => downloadFile(file)}
          >
            <img className="w-12" src={downloadIcon} alt=""></img>
          </button>
        </div>
      )}
    </>
  );
}
// export default React.memo(RenderFileMessage);
//   return isImage(file) ? (
//     <div className="mb-2 relative group/images">
//       <img
//         className={`${
//           isSender ? "border-sky-500 " : "border-white/30"
//         } rounded-3xl max-w-[600px] max-h-[600px] object-contain border border-solid cursor-pointer`}
//         src={`http://localhost:5000/uploads/files/${file}`}
//         alt=""
//         onClick={() => {
//           setIsFullScreen(true);
//           setFullScreenParams(file);
//         }}
//       ></img>
//       <button
//         className="absolute top-2 right-2 flex  items-center justify-center w-10 h-10 rounded-full bg-black invisible group-hover/images:visible"
//         onClick={() => downloadFile(file)}
//       >
//         <img className="w-8 ml-0.5" src={downloadIcon} alt=""></img>
//       </button>
//     </div>
//   ) : isRecording ? (
//     // {childern}
//     // <div></div>
//     <Suspense fallback={<div>loading..</div>}>
//       <VoiceMessage file={file} isSender={isSender}></VoiceMessage>
//     </Suspense>
//   ) : (
//     <div
//       className={`flex items-center justify-between border border-solid rounded-md p-6 w-[350px] bg-white/10 mb-2 ${
//         isSender ? "border-sky-500 " : "border-white/30"
//       }`}
//     >
//       <div className="flex items-center justify-center w-14 h-14 rounded-full bg-black/60">
//         <img className="w-8" src={fileImage} alt=""></img>
//       </div>
//       <div className=" w-[150px] text-lg text-[#F5DEB3] break-all">{file}</div>
//       <button
//         className="flex items-center justify-center w-14 h-14 rounded-full bg-black/60"
//         onClick={() => downloadFile(file)}
//       >
//         <img className="w-12" src={downloadIcon} alt=""></img>
//       </button>
//     </div>
//   );
// }
