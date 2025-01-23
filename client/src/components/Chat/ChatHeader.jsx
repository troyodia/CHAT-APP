import block from "../../images/icons/blockLock.png";
import unblock from "../../images/icons/unblocklock.png";

import cancel from "../../images/icons/cancelround.png";
import settings from "../../images/icons/settingsIcon.png";
import React, { useEffect } from "react";
import { useAppStore } from "../../store/index.js";
import { useShallow } from "zustand/shallow";

import axiosInstance from "../../utils/axiosInstance.js";
import { useSocket } from "../../use-contexts/socketContext.jsx";
import {
  GET_ONLINE_STATUS_URL,
  GET_BLOCKED_CONTACTS_URL,
  BLOCK_CONTACT_URL,
  UNBLOCK_CONTACT_URL,
  AWS_BASE_FILE_PATH,
} from "../../utils/URLS.js";

export default function ChatHeader() {
  const socket = useSocket();
  const {
    selectedChatData,
    setActiveItem,
    closeChat,
    setToggleSettings,
    isOnline,
    blockedContacts,
    setBlockedContacts,
  } = useAppStore(
    useShallow((state) => ({
      selectedChatData: state.selectedChatData,
      setActiveItem: state.setActiveItem,
      closeChat: state.closeChat,
      setToggleSettings: state.setToggleSettings,
      isOnline: state.isOnline,
      blockedContacts: state.blockedContacts,
      setBlockedContacts: state.setBlockedContacts,
    }))
  );
  useEffect(() => {
    const setBlockedContacts = useAppStore.getState().setBlockedContacts;
    const controller = new AbortController();

    const getBlockedContacts = async () => {
      try {
        const res = await axiosInstance.get(GET_BLOCKED_CONTACTS_URL, {
          withCredentials: true,
          signal: controller.signal,
        });
        if (res.data && res.status === 200) {
          setBlockedContacts(res.data.blockedContacts.blockedContacts);
        }
      } catch (error) {
        console.log(error?.response?.data?.msg);
      }
    };
    getBlockedContacts();
    return () => {
      controller.abort();
    };
  }, []);
  const blockUserSocket = (data) => {
    socket.emit("user-block-status", {
      contact: selectedChatData.id,
      status: data.includes(selectedChatData.id),
    });
  };
  const handleBlockUser = async () => {
    try {
      const res = await axiosInstance.post(
        BLOCK_CONTACT_URL,
        { contact: selectedChatData.id },
        { withCredentials: true }
      );
      if (res.data && res.status === 200) {
        const { blockedContacts } = res.data.blockedContactsArr;
        setBlockedContacts(blockedContacts);
        blockUserSocket(blockedContacts);
        useAppStore.setState((prev) => ({
          uploadedFilesMap: new Map(prev.uploadedFilesMap).set(
            selectedChatData.id,
            []
          ),
        }));
        useAppStore.setState((prev) => ({
          replyMap: new Map(prev.replyMap).set(selectedChatData.id, undefined),
        }));
        useAppStore.setState((prev) => ({
          messageMap: new Map(prev.messageMap).set(selectedChatData.id, ""),
        }));
        useAppStore.setState((prev) => ({
          audioRecordingMap: new Map(prev.audioRecordingMap).set(
            selectedChatData.id,
            false
          ),
        }));
      }
    } catch (error) {
      console.log(error?.response?.data?.msg);
    }
  };
  const handleUnBlockUser = async () => {
    const controller = new AbortController();
    try {
      const res = await axiosInstance.post(
        UNBLOCK_CONTACT_URL,
        { contact: selectedChatData.id },
        { withCredentials: true, signal: controller.signal }
      );
      if (res.data && res.status === 200) {
        const { blockedContacts: userBlockedContacts } =
          res.data.blockedContactsArr;
        setBlockedContacts(userBlockedContacts);
        blockUserSocket(userBlockedContacts);
      }
    } catch (error) {
      console.log(error?.response?.data?.msg);
    }
    return () => {
      controller.abort();
    };
  };

  useEffect(() => {
    if (socket) {
      const setIsOnline = useAppStore.getState().setIsOnline;
      const handleOfflineFunc = (data) => {
        setIsOnline(false);
      };
      const handleOnlineFunc = (data) => {
        setIsOnline(true);
      };
      socket.on("contact-offline", handleOfflineFunc);
      socket.on("contact-online", handleOnlineFunc);
      return () => {
        socket.off("contact-offline", handleOfflineFunc);
        socket.off("contact-online", handleOnlineFunc);
      };
    }
  }, [socket]);
  useEffect(() => {
    const selectedChatData = useAppStore.getState().selectedChatData;
    const setIsOnline = useAppStore.getState().setIsOnline;
    const controller = new AbortController();
    const getOnlinestatus = async () => {
      try {
        const res = await axiosInstance.post(
          GET_ONLINE_STATUS_URL,
          { contactId: selectedChatData.id },
          { withCredentials: true, signal: controller.signal }
        );
        if (res.data && res.status === 200) {
          setIsOnline(res.data.contactOnlineStatus.onlineStatus);
        }
      } catch (error) {
        console.log(error?.response?.data?.msg);
      }
    };
    getOnlinestatus();
    return () => {
      controller.abort();
    };
  }, [selectedChatData]);
  return (
    <div className="flex h-28 w-full items-center">
      <div className="flex items-center">
        <div className="w-16 h-16 ml-8 mr-4">
          {selectedChatData ? (
            <img
              className="w-14 h-14 rounded-lg object-cover"
              src={`${AWS_BASE_FILE_PATH}/profiles/${selectedChatData.image}`}
              alt=""
            ></img>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-xl mx-auto capitalize">
            {selectedChatData
              ? selectedChatData.firstname + " " + selectedChatData.lastname
              : ""}
          </span>
          <span className="italic text-[#FFD700] font-semibold">
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>
      <div className="flex ml-4">
        <button
          className="w-9 pt-1"
          onClick={() => {
            closeChat();
            setActiveItem(undefined);

            setToggleSettings(false);
          }}
        >
          <img src={cancel} alt=""></img>
        </button>
      </div>

      <div className="flex mr-6 relative group  ml-auto">
        <button
          className="w-6 "
          onClick={() => {
            if (blockedContacts.includes(selectedChatData.id)) {
              handleUnBlockUser();
            } else {
              handleBlockUser();
            }
          }}
        >
          <img
            src={
              !blockedContacts.includes(selectedChatData.id) ? block : unblock
            }
            alt=""
          ></img>
          <span
            className=" w-16 p-2 top-8 left-1/2 -translate-x-1/2  
        text-sm text-black bg-white hidden group-hover:flex group-hover:justify-center absolute rounded-lg capitalize z-30"
          >
            {!blockedContacts.includes(selectedChatData.id)
              ? "Block " + selectedChatData.firstname
              : "Unblock " + selectedChatData.firstname}
          </span>{" "}
        </button>
      </div>
      <div className="flex mr-6 ">
        <button
          className="w-7"
          onClick={() => {
            useAppStore.setState((prev) => ({
              toggleSettings: !prev.toggleSettings,
            }));
          }}
        >
          <img src={settings} alt=""></img>
        </button>
      </div>
    </div>
  );
}
