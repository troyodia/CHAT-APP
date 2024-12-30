import { useAppStore } from "../../store";
import UserList from "./UserList";
import axiosInstance from "../../utils/axiosInstance";
import React, { useCallback, useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useState } from "react";
import dayjs from "dayjs";
function DirectMessageContactList() {
  const contactListUrl =
    "http://localhost:5000/api/v1/contactList/getContactList";
  const unreadMessagesUrl =
    "http://localhost:5000/api/v1/messages/unreadMessages";

  const { directMessageContactList } = useAppStore(
    useShallow((state) => ({
      directMessageContactList: state.directMessageContactList,
    }))
  );

  const getContactList = useCallback(async () => {
    const { setDirectMessageContactList } = useAppStore.getState();
    try {
      const res = await axiosInstance.get(contactListUrl, {
        withCredentials: true,
      });
      if (res.data && res.status === 200) {
        // setDirectMessageContactList(res.data);
        const messageList = res.data;
        const setUnreadMessages = useAppStore.getState().setUnreadMessages;
        let tempDate = "2011-01-01";
        let lastMsg = "";
        try {
          const res = await axiosInstance.get(unreadMessagesUrl, {
            withCredentials: true,
          });
          if (res?.data?.unreadMessages?.length > 0 && res.status === 200) {
            setUnreadMessages(res.data.unreadMessages);
            console.log(res.data.unreadMessages);
            const unreadMessagesTemp = [...res.data.unreadMessages];
            if (messageList.length > 0) {
              let alteredMessageList = [...messageList];
              unreadMessagesTemp.forEach((msg, index) => {
                if (dayjs(msg.timeStamps).isAfter(dayjs(tempDate))) {
                  tempDate = msg.timeStamps;
                  const locationIndex = alteredMessageList.findIndex(
                    (dm) => dm._id === msg.sender
                  );
                  alteredMessageList.unshift(
                    alteredMessageList.splice(locationIndex, 1)[0]
                  );
                  console.log(locationIndex, alteredMessageList[locationIndex]);
                }
                console.log(alteredMessageList);
              });
              setDirectMessageContactList(alteredMessageList);
            }
            console.log(res.data.firstUnreadMessage);
            res.data.firstUnreadMessage.map((message) => {
              useAppStore.setState((prev) => ({
                firstUnreadMessage: new Map(prev.firstUnreadMessage).set(
                  message.sender,
                  message._id
                ),
              }));
            });
          } else {
            setDirectMessageContactList(messageList);
          }
        } catch (error) {
          console.log(error);
          console.log(error?.response?.data?.msg);
        }
      }
    } catch (error) {
      console.log(error?.response?.data?.msg);
    }
  }, []);

  useEffect(() => {
    getContactList();
  }, [getContactList]);

  // useEffect(() => {
  //   const getUnreadMessages = async () => {
  //     const setUnreadMessages = useAppStore.getState().setUnreadMessages;
  //     let tempDate = "2011-01-01";
  //     let lastMsg = "";
  //     try {
  //       const res = await axiosInstance.get(unreadMessagesUrl, {
  //         withCredentials: true,
  //       });
  //       if (res?.data?.unreadMessages?.length > 0 && res.status === 200) {
  //         setUnreadMessages(res.data.unreadMessages);
  //         const unreadMessagesTemp = [...res.data.unreadMessages];
  //         if (directMessageContactList.length > 1) {
  //           let alteredMessageList = [...directMessageContactList];
  //           console.log(alteredMessageList);
  //           unreadMessagesTemp.forEach((msg, index) => {
  //             if (dayjs(msg.timeStamps).isAfter(dayjs(tempDate))) {
  //               tempDate = msg.timeStamps;
  //               const locationIndex = alteredMessageList.findIndex(
  //                 (dm) => dm._id === msg.sender
  //               );
  //               alteredMessageList.splice(locationIndex, 1);
  //               alteredMessageList.unshift(alteredMessageList[locationIndex]);
  //             }
  //             // console.log(alteredMessageList);
  //             lastMsg = msg.sender;
  //           });
  //         }

  //         res.data.firstUnreadMessage.map((message) => {
  //           useAppStore.setState((prev) => ({
  //             firstUnreadMessage: new Map(prev.firstUnreadMessage).set(
  //               message.sender,
  //               message._id
  //             ),
  //           }));
  //         });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       console.log(error?.response?.data?.msg);
  //     }
  //   };
  //   getUnreadMessages();
  // }, [directMessageContactList]);
  return (
    <div className="w-full bg-[#0E0E10] rounded-lg space-y-2 max-h-56 overflow-auto scrollbar-hidden scrollbar-hidden::-webkit-scrollbar">
      {directMessageContactList.length > 0
        ? directMessageContactList.map((item) => {
            return (
              <UserList
                image={item?.image}
                firstname={item?.firstname}
                lastname={item?.lastname}
                id={item?._id}
                key={item?._id}
              ></UserList>
            );
          })
        : ""}
    </div>
  );
}
export default React.memo(DirectMessageContactList);
