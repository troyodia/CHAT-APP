import { useCallback, useEffect } from "react";
import { useAppStore } from "../store";
import { useShallow } from "zustand/shallow";
import { useSocket } from "../use-contexts/socketContext";
import axiosInstance from "../utils/axiosInstance";
import {
  UPDATE_MESSAGE_READ_STATUS_URL,
  GET_LAST_MESSAGE_URL,
} from "../utils/URLS";
export default function ChatPage({ emptyChat, chat, detail, messageList }) {
  const {
    selectedChatType,
    fetchData,
    toggleSettings,
    directMessageContactList,
    setDirectMessageContactList,
  } = useAppStore(
    useShallow((state) => ({
      selectedChatType: state.selectedChatType,
      fetchData: state.fetchData,
      toggleSettings: state.toggleSettings,
      directMessageContactList: state.directMessageContactList,
      setDirectMessageContactList: state.setDirectMessageContactList,
    }))
  );
  const socket = useSocket();
  useEffect(() => {
    const controller = new AbortController();
    fetchData();
    return () => {
      controller.abort();
    };
  }, [fetchData]);

  const handleSetFirstUnreadMessage = (id, message) => {
    useAppStore.setState((prev) => ({
      firstUnreadMessage: new Map(prev.firstUnreadMessage).set(id, message),
    }));
  };
  const handleSetMessageNotifications = (id) => {
    useAppStore.setState((prev) => ({
      messageNotification: new Map(prev.messageNotification).set(
        id,
        1 +
          (prev.messageNotification.get(id) !== undefined
            ? prev.messageNotification.get(id)
            : 0)
      ),
    }));
  };
  const handleNotificaficationPos = useCallback(
    (id) => {
      let alteredMessageList = [...directMessageContactList];
      const locationIndex = alteredMessageList.findIndex((dm) => dm._id === id);
      alteredMessageList.unshift(
        alteredMessageList.splice(locationIndex, 1)[0]
      );
      setDirectMessageContactList(alteredMessageList);
    },
    [directMessageContactList, setDirectMessageContactList]
  );

  const setLastMessageMap = (contactid, lastMessage) => {
    useAppStore.setState((prev) => ({
      lastMessageMap: new Map(prev.lastMessageMap).set(contactid, lastMessage),
    }));
  };
  useEffect(() => {
    if (socket) {
      console.log("socket");
      const handleRecieveMessage = (message) => {
        const addMessage = useAppStore.getState().addMessage;
        const selectedChatType = useAppStore.getState().selectedChatType;
        const selectedChatData = useAppStore.getState().selectedChatData;
        const userInfo = useAppStore.getState().userInfo;
        const firstUnreadMessage = useAppStore.getState().firstUnreadMessage;
        const directMessageContactList =
          useAppStore.getState().directMessageContactList;
        const contactId =
          message.sender._id === userInfo._id
            ? message.recipient._id
            : message.sender._id;

        if (
          selectedChatType !== undefined &&
          (message.sender._id === selectedChatData.id ||
            message.recipient._id === selectedChatData.id)
        ) {
          addMessage(message);
        }
        if (
          (selectedChatType === undefined ||
            selectedChatData.id !== message.sender._id) &&
          userInfo._id !== message.sender._id
        ) {
          const isContact = directMessageContactList.find(
            (e) => e._id === message.sender._id
          );
          if (isContact !== undefined) {
            const updateMessageReadStatus = async () => {
              try {
                const res = await axiosInstance.post(
                  UPDATE_MESSAGE_READ_STATUS_URL,
                  {
                    isUnread: true,
                    messageId: message._id,
                    markAllAsRead: false,
                    contactId: undefined,
                  },
                  { withCredentials: true }
                );
                if (res.data && res.status === 200) {
                  if (
                    firstUnreadMessage.size === 0 ||
                    firstUnreadMessage.get(message.sender._id) === undefined
                  ) {
                    handleSetFirstUnreadMessage(
                      message.sender._id,
                      res.data.firstUnreadMessage
                    );
                  }
                }
              } catch (error) {
                console.log(error.response.data.msg);
              }
            };
            updateMessageReadStatus();
            handleNotificaficationPos(message.sender._id);
            handleSetMessageNotifications(message.sender._id);
          }
        }
        const getLastContactMessage = async () => {
          try {
            const res = await axiosInstance.post(
              GET_LAST_MESSAGE_URL,
              { contactId: contactId },
              { withCredentials: true }
            );
            if (res.data && res.status === 200) {
              const {
                data: {
                  lastMessage: [message],
                },
              } = res;

              if (message !== undefined) {
                const { messages } = message;
                if (messages.messageType === "text") {
                  setLastMessageMap(contactId, {
                    type: "text",
                    message: messages.content,
                  });
                }
                if (messages.messageType === "file") {
                  setLastMessageMap(contactId, {
                    type: "file",
                    message: messages.fileUrl[messages.fileUrl.length - 1],
                  });
                }
                if (messages.messageType === "combined") {
                  setLastMessageMap(contactId, {
                    type: "combined",
                    message: messages.contentAndFile.text,
                  });
                }
              } else {
                setLastMessageMap(contactId, {
                  type: "empty",
                  message: "No messages in chat",
                });
              }
            }
          } catch (error) {
            console.log(error);
            console.log(error?.response?.data?.msg);
          }
        };
        getLastContactMessage();
      };
      socket.on("recieveMessage", handleRecieveMessage);
      return () => {
        socket.off("recieveMessage", handleRecieveMessage);
      };
    }
  }, [socket, handleNotificaficationPos]);

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className=" w-full h-screen flex bg-black/30 text-white">
        {messageList}
        {selectedChatType === undefined && emptyChat}
        {selectedChatType !== undefined && chat}
        {toggleSettings && detail}
      </div>
    </div>
  );
}
