import rasengan from "../../images/icons/newrasengan.png";

import { useMediaQuery } from "react-responsive";

import UserList from "./UserList";
import AddNewUserModal from "./AddNewUserModal";
import AddNewChannelModal from "./AddNewChannel";

import SideBarFooter from "./SideBarFooter";
import DirectMessageSection from "./DirectMessageSection";
import ChannelSection from "./ChannelSection";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/shallow";
export default function MessageList({
  directMessageSection,
  channelSection,
  sideBarFooter,
  addNewUserModal,
  addNewChannelModal,
}) {
  const isMobile = useMediaQuery({ maxWidth: 1200 });
  const transitionPage = useMediaQuery({ maxWidth: 940 });
  const lg = useMediaQuery({ maxWidth: 1006 });
  const md = useMediaQuery({ maxWidth: 768 });

  const { displayChannelModal, displayDirectMessageModal } = useAppStore(
    useShallow((state) => ({
      displayChannelModal: state.displayChannelModal,
      displayDirectMessageModal: state.displayDirectMessageModal,
    }))
  );
  return (
    <>
      <div
        className={`relative flex flex-col items-center ${
          transitionPage ? "w-full" : lg ? "w-[350px]" : "w-[450px]"
        }  border-0 bg-[#010103]`}
      >
        <div className="flex items-center w-full mt-2 mb-4 space-x-2">
          <div className="w-24 ml-4">
            <img
              className="transition ease-in-out delay-150 duration-300 hover:scale-[1.1]"
              src={rasengan}
              alt=""
            ></img>
          </div>
          <div className="font-bold text-3xl">Rasengan</div>
        </div>
        {directMessageSection}
        {channelSection}
        {sideBarFooter}
      </div>
      {displayDirectMessageModal && addNewUserModal}
      {displayChannelModal && addNewChannelModal}
    </>
  );
}
