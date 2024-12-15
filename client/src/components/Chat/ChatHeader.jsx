import React from "react";
import block from "../../images/icons/blockUserIcon.png";
import cancel from "../../images/icons/cancelround.png";
import settings from "../../images/icons/settingsIcon.png";
import { useEffect, useRef, useState } from "react";
import { useAppStore } from "../../store/index.js";
import { shallow, useShallow } from "zustand/shallow";
import phoneCallIcon from "../../images/icons/telephone.png";
import videoCallIcon from "../../images/icons/videoCallIcon.png";
export default function ChatHeader() {
  console.log("child");
  const { selectedChatData, setActiveItem, closeChat, setToggleSettings } =
    useAppStore(
      useShallow((state) => ({
        selectedChatData: state.selectedChatData,
        setActiveItem: state.setActiveItem,
        closeChat: state.closeChat,
        setToggleSettings: state.setToggleSettings,
      }))
    );
  return (
    <div className="flex h-28 w-full items-center">
      <div className="flex items-center">
        <div className="w-16 h-16 ml-8 mr-4">
          {selectedChatData ? (
            <img
              className="w-16 h-16 rounded-lg object-cover"
              src={`http://localhost:5000/uploads/profiles/${selectedChatData.image}`}
              alt=""
            ></img>
          ) : (
            ""
          )}
        </div>
        <div>
          <p className="font-semibold text-xl mx-auto capitalize">
            {selectedChatData
              ? selectedChatData.firstname + " " + selectedChatData.lastname
              : ""}
          </p>
        </div>
      </div>
      <div className="flex ml-10">
        <button
          className="w-9 pt-1"
          onClick={() => {
            closeChat();
            setActiveItem(undefined);
          }}
        >
          <img src={cancel} alt=""></img>
        </button>
      </div>
      <div className="mr-6 ml-auto">
        <button className="w-7">
          <img src={phoneCallIcon} alt=""></img>
        </button>
      </div>
      <div className="mr-6 pt-1">
        <button
          className="w-10" //pt-1
        >
          <img src={videoCallIcon} alt=""></img>
        </button>
      </div>
      <div className="flex mr-6 ">
        <button className="w-10">
          <img src={block} alt=""></img>
        </button>
      </div>
      <div className="flex mr-6 ">
        <button
          className="w-7"
          onClick={() => {
            setToggleSettings();
          }}
        >
          <img src={settings} alt=""></img>
        </button>
      </div>
    </div>
  );
}
