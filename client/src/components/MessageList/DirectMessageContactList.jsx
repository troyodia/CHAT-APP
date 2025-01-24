import { useAppStore } from "../../store";
import UserList from "./UserList";
import axiosInstance from "../../utils/axiosInstance";
import React, { useCallback, useEffect, useRef } from "react";
import { useShallow } from "zustand/shallow";
import dayjs from "dayjs";
import RenderLastMessage from "./RenderLastMessage";
import {
  GET_UNREAD_MESSAGES_URL,
  GET_CONTACT_LIST_URL,
} from "../../utils/URLS";
function DirectMessageContactList() {
  const getContactsAbortControllerRef = useRef(null);
  const getUnreadAbortControllerRef = useRef(null);
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
    getContactsAbortControllerRef.current = new AbortController();
    getUnreadAbortControllerRef.current = new AbortController();
    try {
      const res = await axiosInstance.get(GET_CONTACT_LIST_URL, {
        withCredentials: true,
        signal: getContactsAbortControllerRef.current.signal,
      });
      if (res.data && res.status === 200) {
        const messageList = res.data;
        const setUnreadMessages = useAppStore.getState().setUnreadMessages;
        let tempDate = "2011-01-01";
        try {
          const res = await axiosInstance.get(GET_UNREAD_MESSAGES_URL, {
            withCredentials: true,
            signal: getUnreadAbortControllerRef.current.signal,
          });
          if (res?.data?.unreadMessages?.length > 0 && res.status === 200) {
            setUnreadMessages(res.data.unreadMessages);
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
                }
              });
              setDirectMessageContactList(alteredMessageList);
            }
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
    const abortGetContacts = getContactsAbortControllerRef.current;
    const abortGetUnreadMessages = getUnreadAbortControllerRef.current;
    return () => {
      if (abortGetContacts) {
        abortGetContacts.abort();
      }
      if (abortGetUnreadMessages) {
        abortGetUnreadMessages.abort();
      }
    };
  }, [getContactList]);
  useEffect(() => {
    const directMessageContactList =
      useAppStore.getState().directMessageContactList;
    const setDMListSearchResultsArr =
      useAppStore.getState().setDMListSearchResultsArr;
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
    <div className=" w-full bg-[#0E0E10] rounded-lg space-y-2 max-h-[420px] overflow-y-auto scrollbar-hidden scrollbar-hidden::-webkit-scrollbar">
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
            >
              <RenderLastMessage id={item?._id} />
            </UserList>
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
            >
              <RenderLastMessage id={item?._id} />
            </UserList>
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
