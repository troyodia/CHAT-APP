import React from "react";
import { useAppStore } from "../../store";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import plusIcon from "../../images/icons/plus.png";
import minusIcon from "../../images/icons/minus.png";
import searchIcon from "../../images/icons/search.png";
import DirectMessageContactList from "./DirectMessageContactList";
import { useShallow } from "zustand/shallow";

export default function DirectMessageSection() {
  const [showSearch, setShowSearch] = useState(false);
  const {
    displayDirectMessageModal,
    setDisplayDirectMessageModal,
    dmSearch,
    setDMSearch,
    setDMListSearchResultsArr,
  } = useAppStore(
    useShallow((state) => ({
      displayDirectMessageModal: state.displayDirectMessageModal,
      setDisplayDirectMessageModal: state.setDisplayDirectMessageModal,
      dmSearch: state.dmSearch,
      setDMSearch: state.setDMSearch,
      setDMListSearchResultsArr: state.setDMListSearchResultsArr,
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
          DIRECT MESSAGES
        </div>
        <div className="flex ml-auto space-x-3 my-auto">
          <button
            className="w-6 h-6 flex justify-center items-center rounded-md bg-white/10"
            onClick={() => {
              setShowSearch((prev) => !prev);
              if (showSearch) {
                setDMSearch("");
                setDMListSearchResultsArr([]);
              }
            }}
          >
            <img className="w-5" src={searchIcon} alt=""></img>
          </button>
          <button
            className="w-6 h-6 flex justify-center items-center rounded-md py-1 bg-white/10 "
            onClick={() => {
              setDisplayDirectMessageModal();
            }}
          >
            <img
              className="w-4"
              src={displayDirectMessageModal ? minusIcon : plusIcon}
              alt=""
            ></img>
          </button>
        </div>
      </div>
      {showSearch ? (
        <div className="flex w-full  mb-2">
          <input
            className=" rounded-md flex-1 py-2 pl-5 bg-white/10 outline-none 
    border border-transparent focus:border focus:border-solid  focus:border-white/30"
            placeholder="Search"
            value={dmSearch}
            onChange={(e) => {
              setDMSearch(e.target.value);
            }}
          ></input>
        </div>
      ) : (
        ""
      )}
      <DirectMessageContactList></DirectMessageContactList>
    </div>
  );
}
