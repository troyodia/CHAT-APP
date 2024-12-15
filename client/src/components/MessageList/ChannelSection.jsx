import React from "react";
import { useAppStore } from "../../store";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import plusIcon from "../../images/icons/plus.png";
import minusIcon from "../../images/icons/minus.png";
import searchIcon from "../../images/icons/search.png";
import { useShallow } from "zustand/shallow";
export default function ChannelSection() {
  const [showSearchChannel, setShowSearchChannel] = useState(false);
  const {
    displayChannelModal,
    displayDirectMessageModal,
    setDisplayChannelModal,
  } = useAppStore(
    useShallow((state) => ({
      displayChannelModal: state.displayChannelModal,
      displayDirectMessageModal: state.displayDirectMessageModal,
      setDisplayChannelModal: state.setDisplayChannelModal,
    }))
  );
  const isMobile = useMediaQuery({ maxWidth: 1200 });
  const transitionPage = useMediaQuery({ maxWidth: 940 });
  return (
    <div className="flex flex-col w-full items-center px-10 mb-10">
      <div className="flex w-full mb-4">
        <div
          className={`text-zinc-600 font-semibold ${
            transitionPage ? "text-2xl" : isMobile ? "text-lg" : "text-2xl"
          }`}
        >
          CHANNELS
        </div>
        <div className="flex ml-auto space-x-3 my-auto">
          <button
            className="w-6 h-6  flex justify-center items-center rounded-md bg-white/10"
            onClick={() => {
              setShowSearchChannel((prev) => !prev);
            }}
          >
            <img className="w-5" src={searchIcon} alt=""></img>
          </button>
          <button
            className="w-6 h-6 flex justify-center items-center rounded-md py-1 bg-white/10 "
            onClick={() => {
              //   if (!addFlag) {
              //     setAddFlagChannel((prev) => !prev);
              //     setDisplayChannel((prev) => !prev);
              //   }
              !displayDirectMessageModal && setDisplayChannelModal();
            }}
          >
            <img
              className="w-4"
              //   src={addFlagChannel ? minusIcon : plusIcon}
              src={displayChannelModal ? minusIcon : plusIcon}
              alt=""
            ></img>
          </button>
        </div>
      </div>
      {showSearchChannel ? (
        <div className="flex w-full mb-2">
          <input
            className=" rounded-md flex-1 py-2 pl-5 bg-white/10 outline-none 
          border border-transparent focus:border focus:border-solid  focus:border-white/30"
            placeholder="Search"
          ></input>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
