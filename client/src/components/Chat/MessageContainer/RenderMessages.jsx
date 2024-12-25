import React from "react";
import dayjs from "dayjs";
import { useAppStore } from "../../../store";
import { useShallow } from "zustand/shallow";
import { v4 as uuidv4 } from "uuid";
import repliedIconFlip from "../../../images/icons/replyIconFlip.png";
import fileImage from "../../../images/icons/myfile.png";
import { isImage } from "../../../utils/isImage";
import RenderFileMessage from "./RenderFileMessage";
import ReplyButton from "./ReplyButton";
import CreateMessage from "./CreateMessage";

export default function RenderMessages() {
  let latestDate = null;
  console.log("render messages");
  const { selectedChatMessages, userInfo } = useAppStore(
    useShallow((state) => ({
      selectedChatMessages: state.selectedChatMessages,
      userInfo: state.userInfo,
    }))
  );

  return selectedChatMessages.map((message) => {
    console.log("going through ");
    const isSender = message.sender === userInfo._id;

    const messageDate = dayjs(message.timeStamps).format("YYYY-MM-DD");
    const showDate = latestDate !== messageDate;
    latestDate = messageDate;
    return (
      <CreateMessage
        key={message._id}
        showDate={showDate}
        timeStamps={message.timeStamps}
        messageSender={message.sender}
        isSender={isSender}
        messageReply={message.reply}
        replySender={message.reply?.sender}
        repliedText={message.reply?.repliedText}
        repliedFile={message.reply?.repliedFile}
        messageType={message.messageType}
        messageContent={message.content}
        messageId={message._id}
        isRecording={message.isRecording}
        isUnread={message.isUnread}
        messageFiles={message.fileUrl}
        combinedMessageFiles={message.contentAndFile?.files}
        combinedMessageText={message.contentAndFile?.text}
      />
    );
  });
}
// {/* <div key={message._id}>
// <div>
//   {showDate ? (
//     <div className="flex justify-center text-lg  mb-6 mt-4 text-[#F5DEB3] ">
//       {dayjs(message.timeStamps).format("dddd, MMMM D")}
//     </div>
//   ) : (
//     ""
//   )}
// </div>
// <div
//   className={`${message.sender === userInfo._id ? "ml-16" : "mr-16"}`}
//   key={message._id}
// >
//   {/* {showDate ? (
//         <div className="flex justify-center text-lg  mb-6 mt-4 text-[#F5DEB3] border">
//           {dayjs(message.timeStamps).format("dddd, MMMM D")}
//         </div>
//       ) : (
//         ""
//       )} */}
//   {selectedChatType === "contact" && (
//     <div
//       className={`${
//         isSender
//           ? " ml-auto mr-4 text-left items-end"
//           : "ml-4  items-start"
//       } group/items relative flex flex-col mt-4 justify-items w-fit max-w-[900px] min-w-0
//  `}
//     >
//       {message.reply && (
//         <button className="flex border rounded-lg p-2 items-center space-x-4  ">
//           <div className="flex">
//             <img className="w-7" src={repliedIconFlip} alt=""></img>
//             <p className="italic font-bold ">
//               {" "}
//               @{handleReplyName(message.reply.sender)}
//             </p>
//           </div>
//           {message.reply.repliedText ? (
//             <p className="text-sm text-[#F5DEB3] break-all max-h-10 max-w-[550px] line-clamp-2">
//               {message.reply.repliedText}
//             </p>
//           ) : isImage(message.reply.repliedFile) ? (
//             <div className="w-10 h-10">
//               <img
//                 className=" w-full h-full object-cover rounded-md"
//                 src={`http://localhost:5000/uploads/files/${message.reply.repliedFile}`}
//                 alt=""
//               ></img>
//             </div>
//           ) : (
//             <div className="flex truncate space-x-2 items-center">
//               <img className="w-6" src={fileImage} alt=""></img>
//               <p className="max-w-96 truncate text-sm text-[#F5DEB3]">
//                 {message.reply.repliedFile}
//               </p>
//             </div>
//           )}
//         </button>
//       )}

//       {message.messageType === "text" && (
//         <div className=" group/texts">
//           {/* {replyButton(
//         message.content,
//         message.sender,
//         undefined,
//         isSender
//       )} */}
//           <ReplyButton
//             sender={message.sender}
//             replyContent={message.content}
//             replyFile={undefined}
//             isSender={isSender}
//           />
//           <div
//             className={`${
//               isSender
//                 ? "border-sky-500 text-sky-500 bg-[#00eeff]/20 "
//                 : "border-white/30 bg-white/10 "
//             } flex border border-solid rounded-lg p-4 mb-2`}
//           >
//             <p className={`flex w-full break-all`}>{message.content}</p>
//           </div>

//           {/* {renderText(message.content, isSender, message._id)} */}
//         </div>
//       )}

//       {message.messageType === "file" &&
//         message.fileUrl.map((file) => {
//           return (
//             <div className=" group/files" key={uuidv4()}>
//               {/* {replyButton(undefined, message.sender, file, isSender)} */}
//               <ReplyButton
//                 sender={message.sender}
//                 replyContent={undefined}
//                 replyFile={file}
//                 isSender={isSender}
//               />

//               {/* {renderFile(file, isSender, message._id, message.isRecording)} */}
//               <RenderFileMessage
//                 file={file}
//                 isSender={isSender}
//                 id={message._id}
//                 isRecording={message.isRecording}
//               />
//             </div>
//           );
//         })}

//       {message.messageType === "combined" && (
//         <div
//           className={`flex flex-col ${
//             isSender ? "items-end" : "items-start"
//           }`}
//         >
//           {message.contentAndFile.files.map((file) => {
//             return (
//               <div className=" group/files" key={uuidv4()}>
//                 {/* {replyButton(undefined, message.sender, file, isSender)} */}
//                 {/* {renderFile(
//               file,
//               isSender,
//               message._id,
//               message.isRecording
//             )} */}
//                 <ReplyButton
//                   sender={message.sender}
//                   replyContent={undefined}
//                   replyFile={file}
//                   isSender={isSender}
//                 />

//                 <RenderFileMessage
//                   file={file}
//                   isSender={isSender}
//                   id={message._id}
//                   isRecording={message.isRecording}
//                 />
//               </div>
//             );
//           })}
//           <div className=" group/texts">
//             {/* {replyButton(
//           message.content,
//           message.sender,
//           undefined,
//           isSender
//         )} */}
//             <ReplyButton
//               sender={message.sender}
//               replyContent={message.content}
//               replyFile={undefined}
//               isSender={isSender}
//             />
//             <div
//               className={`${
//                 isSender
//                   ? "border-sky-500 text-sky-500 bg-[#00eeff]/20 "
//                   : "border-white/30 bg-white/10 "
//               } flex border border-solid rounded-lg p-4 mb-2`}
//             >
//               <p className={`flex w-full break-all`}>
//                 {message.content}
//               </p>
//             </div>

//             {/* {renderText(message.contentAndFile.text, isSender)} */}
//           </div>
//         </div>
//       )}
//       <div
//         className={`mt-1 flex ${
//           isSender ? "justify-end" : "justify-start"
//         } text-[#F5DEB3]`}
//       >
//         {dayjs(message.timeStamps).format("h:mm A")}
//       </div>
//     </div>
//   )}
// </div>
// </div>  */}
