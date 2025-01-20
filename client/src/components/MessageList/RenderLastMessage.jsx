import React, { useEffect } from "react";
import { useAppStore } from "../../store";
import axiosInstance from "../../utils/axiosInstance";
import { isImage } from "../../utils/isImage";
import pictureIcon from "../../images/icons/picture.png";
import fileIcon from "../../images/icons/file-Icon.png";
import pictureIconBlack from "../../images/icons/pictureIconBlack.png";
import fileIconBlack from "../../images/icons/file-Icon-black.png";
import { GET_LAST_MESSAGE_URL } from "../../utils/URLS";
function RenderLastMessage({ id }) {
  const lastMessageMap = useAppStore((state) => state.lastMessageMap);
  const activeItem = useAppStore((state) => state.activeItem);
  const setLastMessageMap = (contactid, lastMessage) => {
    useAppStore.setState((prev) => ({
      lastMessageMap: new Map(prev.lastMessageMap).set(contactid, lastMessage),
    }));
  };
  useEffect(() => {
    const controller = new AbortController();
    const getLastContactMessage = async () => {
      try {
        const res = await axiosInstance.post(
          GET_LAST_MESSAGE_URL,
          { contactId: id },
          { withCredentials: true, signal: controller.signal }
        );
        if (res.data && res.status === 200) {
          const {
            data: {
              lastMessage: [message],
            },
          } = res;
          console.log(message);

          if (message !== undefined) {
            const { messages } = message;
            if (messages.messageType === "text") {
              setLastMessageMap(id, {
                type: "text",
                message: messages.content,
              });
            }
            if (messages.messageType === "file") {
              setLastMessageMap(id, {
                type: "file",
                message: messages.fileUrl[messages.fileUrl.length - 1],
              });
            }
            if (messages.messageType === "combined") {
              setLastMessageMap(id, {
                type: "combined",
                message: messages.contentAndFile.text,
              });
            }
          } else {
            setLastMessageMap(id, {
              type: "empty",
              message: "No messages in chat",
            });
          }
        }
      } catch (error) {
        // console.log(error);
        console.log(error?.response?.data?.msg);
      }
    };
    getLastContactMessage();
    return () => {
      controller.abort();
    };
  }, [id]);
  return (
    <>
      {lastMessageMap &&
        (lastMessageMap.get(id) !== undefined || null) &&
        lastMessageMap.get(id).type === "text" && (
          <p className={`items-end flex text-xs font-semibold`}>
            {lastMessageMap.get(id).message}
          </p>
        )}
      {lastMessageMap &&
        (lastMessageMap.get(id) !== undefined || null) &&
        lastMessageMap.get(id).type === "empty" && (
          <p className={`items-end flex italic text-xs font-semibold`}>
            {lastMessageMap.get(id).message}
          </p>
        )}
      {lastMessageMap &&
        (lastMessageMap.get(id) !== undefined || null) &&
        lastMessageMap.get(id).type === "combined" && (
          <p className={`items-end flex text-xs font-semibold`}>
            {lastMessageMap.get(id).message}
          </p>
        )}
      {lastMessageMap &&
        (lastMessageMap.get(id) !== undefined || null) &&
        lastMessageMap.get(id).type === "file" && (
          <div className="flex space-x-1 items-center font-semibold">
            {isImage(lastMessageMap.get(id).message) ? (
              <>
                <img
                  className="w-6"
                  src={activeItem === id ? pictureIconBlack : pictureIcon}
                  alt=""
                ></img>
                <span className="text-xs">Image</span>
              </>
            ) : (
              <>
                <img
                  className="w-4"
                  src={activeItem === id ? fileIconBlack : fileIcon}
                  alt=""
                ></img>
                <span className="text-xs">File</span>
              </>
            )}
          </div>
        )}
    </>
  );
}
export default React.memo(RenderLastMessage);
