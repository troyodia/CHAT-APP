import React from "react";
import MessageList from "./MessageList";
import DirectMessageSection from "./DirectMessageSection";
import ChannelSection from "./ChannelSection";
import SideBarFooter from "./SideBarFooter";
import AddNewUserModal from "./AddNewUserModal";
import AddNewChannelModal from "./AddNewChannel";

export default function MessageListContainer() {
  return (
    <MessageList
      directMessageSection={<DirectMessageSection />}
      channelSection={<ChannelSection />}
      sideBarFooter={<SideBarFooter />}
      addNewUserModal={<AddNewUserModal />}
      addNewChannelModal={<AddNewChannelModal />}
    />
  );
}
