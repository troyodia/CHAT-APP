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

  const { directMessageContactList, dmSearch, dmListSearchResultsArr } =
    useAppStore(
      useShallow((state) => ({
        directMessageContactList: state.directMessageContactList,
        dmSearch: state.dmSearch,
        dmListSearchResultsArr: state.dmListSearchResultsArr,
      }))
    );
  const getContactList = useCallback(async () => {
    const { setDirectMessageContactList } = useAppStore.getState();
    try {
      const res = await axiosInstance.get(contactListUrl, {
        withCredentials: true,
      });
      if (res.data && res.status === 200) {
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
  useEffect(() => {
    const directMessageContactList =
      useAppStore.getState().directMessageContactList;
    const setDMListSearchResultsArr =
      useAppStore.getState().setDMListSearchResultsArr;
    console.log(dmSearch);
    const regex = /[`~!#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
    const searchTerm = dmSearch.replace(regex, "");
    const searchRegex = new RegExp(searchTerm, "i");
    const searchedContactArr = directMessageContactList.filter((contact) => {
      return (
        searchRegex.test(contact.firstname) ||
        searchRegex.test(contact.lastname)
      );
    });
    setDMListSearchResultsArr(searchedContactArr);
  }, [dmSearch]);
  return (
    <div className="w-full bg-[#0E0E10] rounded-lg space-y-2 max-h-56 overflow-auto scrollbar-hidden scrollbar-hidden::-webkit-scrollbar">
      {directMessageContactList.length > 0 &&
        dmListSearchResultsArr.length < 1 &&
        dmSearch === "" &&
        directMessageContactList.map((item) => {
          return (
            <UserList
              image={item?.image}
              firstname={item?.firstname}
              lastname={item?.lastname}
              id={item?._id}
              key={item?._id}
            ></UserList>
          );
        })}
      {directMessageContactList.length > 0 &&
        dmListSearchResultsArr.length > 0 &&
        dmListSearchResultsArr.map((item) => {
          return (
            <UserList
              image={item?.image}
              firstname={item?.firstname}
              lastname={item?.lastname}
              id={item?._id}
              key={item?._id}
            ></UserList>
          );
        })}
      {directMessageContactList.length > 0 &&
        dmListSearchResultsArr.length < 1 &&
        dmSearch !== "" && (
          <div className="flex justify-center font-semibold text-[#FFD700] py-1">
            No Contacts Match Search
          </div>
        )}
    </div>
  );
}
export default React.memo(DirectMessageContactList);
