import { useAppStore } from "../../store";
import UserList from "./UserList";
import axiosInstance from "../../utils/axiosInstance";
import React, { useCallback, useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useState } from "react";
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
        setDirectMessageContactList(res.data);
      }
    } catch (error) {
      console.log(error?.response?.data?.msg);
    }
  }, []);

  useEffect(() => {
    getContactList();
  }, [getContactList]);
  useEffect(() => {
    const getUnreadMessages = async () => {
      const setUnreadMessages = useAppStore.getState().setUnreadMessages;
      const setFirstUnreadMessage =
        useAppStore.getState().setFirstUnreadMessage;
      try {
        const res = await axiosInstance.get(unreadMessagesUrl, {
          withCredentials: true,
        });
        if (res.data && res.status === 200) {
          console.log(res.data.unreadMessages);
          setUnreadMessages(res.data.unreadMessages);
          setFirstUnreadMessage(res.data.firstUnreadMessage);
        }
      } catch (error) {
        console.log(error.response.data.msg);
      }
    };
    getUnreadMessages();
  }, []);
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
