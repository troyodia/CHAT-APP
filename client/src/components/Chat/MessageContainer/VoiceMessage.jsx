import React from "react";
import { useState, useRef, useEffect } from "react";

import WaveSurfer from "wavesurfer.js";
import pauseImage from "../../../images/icons/pauseIcon.png";
import playIcon from "../../../images/icons/play.png";

function VoiceMessage({ file, isSender }) {
  // console.log("voice message");
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMessage, setAudioMessage] = useState(null);
  const [CurrentPlayBackTime, setCurrentPlayBackTime] = useState(0);
  const [totalRecordingTime, setTotalRecordingTime] = useState(0);

  const waveFormRef = useRef(null);
  const waveForm = useRef(null);

  useEffect(() => {
    if (waveForm.current === null) {
      // console.log("render");
      waveForm.current = WaveSurfer.create({
        container: waveFormRef.current,
        waveColor: "#ffffff",
        progressColor: "gold",
        cursorColor: "white",
        cursorWidth: 1,
        barWidth: 2,
        height: 40,
        responsive: true,
      });
      waveForm?.current?.on("finish", () => {
        setIsPlaying(false);
      });
    }

    // return () => {
    //   waveForm.current.destroy();
    // };
  }, []);
  useEffect(() => {
    // console.log("render");

    const audioUrl = `http://localhost:5000/uploads/audioFiles/${file}`;
    const audio = new Audio(audioUrl);
    setAudioMessage(audio);
    waveForm?.current?.load(audioUrl).catch((err) => {
      console.log(err);
    });
    waveForm?.current?.on("ready", () => {
      setTotalRecordingTime(waveForm?.current?.getDuration());
    });
  }, [file]);

  useEffect(() => {
    if (audioMessage !== null) {
      const updatePlayBackTime = () => {
        setCurrentPlayBackTime(audioMessage.currentTime);
      };
      audioMessage.addEventListener("timeupdate", updatePlayBackTime);
      return () =>
        audioMessage.removeEventListener("timeupdate", updatePlayBackTime);
    }
  }, [audioMessage]);
  const handlePlayAudio = () => {
    if (audioMessage) {
      waveForm?.current?.play();
      audioMessage.play();
      setIsPlaying(true);
    }
  };
  const handlePauseAudio = () => {
    waveForm?.current?.pause();
    audioMessage.pause();
    setIsPlaying(false);
  };
  const formatRecordingTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <div className="border flex space-x-4 items-center mb-2 p-1">
      {!isPlaying ? (
        <button className="w-7 mr-1" onClick={handlePlayAudio}>
          <img className="w-full" src={playIcon} alt=""></img>
        </button>
      ) : (
        <button className="w-7 mr-1" onClick={handlePauseAudio}>
          <img className="w-full" src={pauseImage} alt=""></img>
        </button>
      )}
      <div className="relative">
        <div className="w-72" ref={waveFormRef} id="waveform"></div>
        <div
          className={`absolute ${
            !isSender && "right-0"
          } bottom-[-24px] text-sm`}
        >
          <span className="ml-2">
            {formatRecordingTime(
              isPlaying ? CurrentPlayBackTime : totalRecordingTime
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
// export default React.memo(VoiceMessage);
export default VoiceMessage;