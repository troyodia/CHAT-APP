import React from "react";
import MessageList from "./MessageList";
import DirectMessageSection from "./DirectMessageSection";
import SideBarFooter from "./SideBarFooter";
import AddNewUserModal from "./AddNewUserModal";

export default function MessageListContainer() {
  return (
    <MessageList
      directMessageSection={<DirectMessageSection />}
      sideBarFooter={<SideBarFooter />}
      addNewUserModal={<AddNewUserModal />}
    />
  );
}
