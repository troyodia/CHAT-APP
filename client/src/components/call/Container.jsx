import React, { useEffect, useState } from "react";
import { useSocket } from "../../use-contexts/socketContext";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/shallow";
import defaultImage from "../../images/default.jpeg";
import endCallIcon from "../../images/icons/endCallGold.png";
import Lottie from "react-lottie";
import * as animationData from "../../lottie/callingLottie.json";
import axiosInstance from "../../utils/axiosInstance";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
export default function Container({ data }) {
  const [callAccepted, setCallAccepted] = useState(false);
  const [token, setToken] = useState(undefined);
  const [zgVar, setZgVar] = useState(undefined);
  const [localStream, setLocalStream] = useState(undefined);
  const [publishStream, setPublishStream] = useState(undefined);

  const socket = useSocket();
  const generateZegoTokenUrl =
    "http://localhost:5000/api/v1/auth/generate-Zego-Token";
  useEffect(() => {
    if (data && data.type === "out-going") {
      socket.on("accepted-call", () => {
        setCallAccepted(true);
      });
    } else {
      const tiemOutId = setTimeout(() => {
        setCallAccepted(true);
      }, 1000);

      // return () => clearTimeout(tiemOutId);
    }
  }, [data, socket]);

  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await axiosInstance(generateZegoTokenUrl, {
          withCredentials: true,
        });
        if (res && res.data) {
          setToken(res.data.token);
        }
      } catch (error) {
        console.log(error.response.data.msg);
      }
    };

    if (callAccepted) {
      getToken();
    }
  }, [callAccepted]);
  useEffect(() => {
    const userInfo = useAppStore.getState().userInfo;
    const endCall = useAppStore.getState().endCall;
    console.log(
      process.env.REACT_APP_PUBLIC_ZEGO_APP_ID,
      process.env.REACT_APP_PUBLIC_ZEGO_SERVER_SECRET
    );
    const startCall = async () => {
      // import("zego-express-engine-webrtc").then(
      // async ({ ZegoExpressEngine }) => {
      const zg = new ZegoExpressEngine(
        parseInt(process.env.REACT_APP_PUBLIC_ZEGO_APP_ID),
        process.env.REACT_APP_PUBLIC_ZEGO_SERVER_SECRET
      );
      setZgVar(zg);

      zg.on(
        "roomStreamUpdate",
        async (roomID, updateType, streamList, extendedData) => {
          if (updateType === "ADD") {
            const remoteVideo = document.getElementById("remote-video");
            const callElement = document.createElement(
              data.callType === "video" ? "video" : "audio"
            );
            callElement.id = streamList[0].streamID;
            callElement.playsInline = true;
            callElement.autoplay = true;
            callElement.muted = false;

            if (remoteVideo) remoteVideo.appendChild(callElement);
            zg.startPlayingStream(streamList[0].streamID, {
              audio: true,
              video: true,
            }).then((stream) => {
              // if (callElement)
              callElement.srcObject = stream;
            });
          } else if (
            updateType === "DELETE" &&
            zg &&
            localStream &&
            streamList[0].streamID
          ) {
            zg.destroyStream(localStream);
            zg.stopPublishingStream(streamList[0].streamID);
            zg.logoutRoom(data.roomId.toString());
            endCall();
          }
        }
      );

      await zg.loginRoom(
        data.roomId.toString(),
        token,
        {
          userID: userInfo._id.toString(),
          userName: userInfo.firstname + " " + userInfo.lastname,
        },
        { userUpdate: true }
      );
      const localStreams = await zg.createStream({
        camera: {
          audio: true,
          video: data.callType === "video" ? true : false,
        },
      });

      const localVideo = document.getElementById("local-video");
      const localCallElement = document.createElement(
        data.callType === "video" ? "video" : "audio"
      );
      localCallElement.id = "video-local-zego";
      localCallElement.className = "w-32 h-28";
      localCallElement.muted = false;
      localCallElement.autoplay = true;
      localCallElement.playsInline = true;
      if (localVideo) {
        localVideo.appendChild(localCallElement);
      }
      const td = document.getElementById("video-local-zego");
      if (td) td.srcObject = localStreams;

      const streamID = "123" + Date.now();
      setPublishStream(streamID);
      setLocalStream(localStreams);
      zg.startPublishingStream(streamID, localStreams);
      // }
      // );
    };
    if (token) {
      // console.log(token);
      startCall();
    }
  }, [token, localStream, data]);
  const { userInfo, endCall } = useAppStore(
    useShallow((state) => ({
      userInfo: state.userInfo,
      endCall: state.endCall,
    }))
  );
  // console.log(data);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const handleEndCall = () => {
    if (zgVar && localStream && publishStream) {
      zgVar.destroyStream(localStream);
      zgVar.stopPublishingStream(publishStream);
      zgVar.logoutRoom(data.roomId.toString());
    }
    socket.emit(`reject-${data.callType}-call`, {
      from: data.id,
    });
    // localStream.removeEventListener()
    // localStream.removeTrack()
    endCall();
  };
  return (
    <div className="text-white flex flex-col items-center  pt-12 shrink h-screen">
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
        <div className="w-80 h-80  flex items-center justify-center  ">
          <img
            className=" w-full h-full  object-cover rounded-xl"
            src={`http://localhost:5000/uploads/profiles/${data.image}`}
            //   src={defaultImage}
            alt=""
          />
        </div>
      )}
      <div className="my-5 relative" id="remote-video">
        <div className="absolute bottom-5 right-5" id="local-video"></div>
      </div>
      <button
        className="w-16 h-16 outline outline-2 flex justify-center items-center rounded-full hover:outline-dashed mt-auto mb-8 shrink-0"
        onClick={handleEndCall}
      >
        <img className="w-10 h-10" src={endCallIcon} alt=""></img>
      </button>
    </div>
  );
}
