import React from "react";
import { useSocket } from "../../use-contexts/socketContext";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/shallow";

export default function IncomingVideoCall() {
  const socket = useSocket();

  const { incomingVideoCall, setIncomingVideoCall, setVideoCall, endCall } =
    useAppStore(
      useShallow((state) => ({
        incomingVideoCall: state.incomingVideoCall,
        setIncomingVideoCall: state.setIncomingVideoCall,
        setVideoCall: state.setVideoCall,
        endCall: state.endCall,
      }))
    );
  const handelAcceptCall = () => {
    setVideoCall({ ...incomingVideoCall, type: "in-coming" });
    socket.emit("accept-incoming-call", {
      id: incomingVideoCall.id,
    });
    setIncomingVideoCall(undefined);
  };
  const handleRejectCall = () => {
    socket.emit("reject-video-call", {
      from: incomingVideoCall.id,
    });
    endCall();
  };
  return (
    <div
      className="fixed right-10 bottom-10 flex space-x-4 backdrop-blur-lg outline outline-2 
outline-[#F5DEB3] hover:outline-dashed z-10 items-center py-2 pl-4 pr-8 animate-bounce hover:animate-none"
    >
      <div className="flex w-20 h-20">
        <img
          className="rounded-lg  w-full object-cover"
          src={`http://localhost:5000/uploads/profiles/${incomingVideoCall.image}`}
          alt=""
        ></img>
      </div>
      <div className="flex flex-col p-2 space-y-2">
        <span className="text-lg text-[#F5DEB3] font-bold">
          {incomingVideoCall.firstname} {incomingVideoCall.lastname}
        </span>
        <span className="text-sm text-[#F5DEB3]">Incoming Video Call</span>
        <div className="flex space-x-2 font-semibold">
          <button
            className="p-2 text-white bg-black rounded-xl"
            onClick={handleRejectCall}
          >
            Reject
          </button>
          <button
            className="p-2 text-black bg-white rounded-xl"
            onClick={handelAcceptCall}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
