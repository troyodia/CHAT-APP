import React, { useState } from "react";
import { useSocket } from "../../use-contexts/socketContext";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/shallow";
import defaultImage from "../../images/default.jpeg";
import endCallIcon from "../../images/icons/endCallGold.png";
import Lottie from "react-lottie";
import * as animationData from "../../lottie/callingLottie.json";

export default function Container({ data }) {
  const [callAccepted, setCallAccepted] = useState(false);
  const socket = useSocket();
  const { userInfo, endCall } = useAppStore(
    useShallow((state) => ({
      userInfo: state.userInfo,
      endCall: state.endCall,
    }))
  );
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  console.log(data);
  return (
    <div className="text-white flex flex-col justify-center items-center  mt-12">
      <div className="text-6xl mb-4 capitalize font-bold">
        {data.firstname} {data.lastname}
      </div>

      {callAccepted && data.callType !== "video" ? (
        <span className="text-lg text-[#F5DEB3] text-semibold mb-24 animate-bounce">
          Call Ongoing
        </span>
      ) : (
        <div className="mb-14">
          <Lottie
            options={defaultOptions}
            height={70}
            width={70}
            isClickToPauseDisabled={true}
          />
        </div>
      )}
      {(!callAccepted || data.callType === "voice") && (
        <div className="w-80 h-80  flex items-center justify-center mb-48 ">
          <img
            className=" w-full h-full  object-cover rounded-xl"
            src={`http://localhost:5000/uploads/profiles/${data.image}`}
            //   src={defaultImage}
            alt=""
          />
        </div>
      )}
      <button
        className="w-20 h-20 outline outline-2 flex justify-center items-center rounded-full hover:outline-dashed"
        onClick={endCall}
      >
        <img className="w-12 h-12" src={endCallIcon} alt=""></img>
      </button>
    </div>
  );
}
