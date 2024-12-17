import React from "react";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/shallow";
import defaultImage from "../../images/default.jpeg";
import { useSocket } from "../../use-contexts/socketContext";

export default function IncomingVoiceCall() {
  const socket = useSocket();
  const { incomingVoiceCall, setIncomingVoiceCall, setVoiceCall, endCall } =
    useAppStore(
      useShallow((state) => ({
        incomingVoiceCall: state.incomingVoiceCall,
        setIncomingVoiceCall: state.setIncomingVoiceCall,
        setVoiceCall: state.setVoiceCall,
        endCall: state.endCall,
      }))
    );
  const handelAcceptCall = () => {
    setVoiceCall({ ...incomingVoiceCall, type: "in-coming" });
    socket.emit("accept-incoming-call", {
      id: incomingVoiceCall.id,
    });
    setIncomingVoiceCall(undefined);
  };
  const handleRejectCall = () => {
    socket.emit("reject-voice-call", {
      from: incomingVoiceCall.id,
    });
    endCall();
  };
  console.log(incomingVoiceCall);
  return (
    <div
      className="fixed right-10 bottom-10 flex space-x-4 backdrop-blur-lg outline outline-2 
    outline-[#F5DEB3] hover:outline-dashed z-10 items-center py-2 pl-4 pr-8"
    >
      <div className="flex w-20 h-20">
        <img
          className="rounded-lg  w-full object-cover"
          src={`http://localhost:5000/uploads/profiles/${incomingVoiceCall.image}`}
          alt=""
        ></img>
      </div>
      <div className="flex flex-col p-2 space-y-2">
        <span className="text-lg text-[#F5DEB3] font-bold">
          {incomingVoiceCall.firstname} {incomingVoiceCall.lastname}
        </span>
        <span className="text-sm text-[#F5DEB3]">Incoming Voice Call</span>
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
