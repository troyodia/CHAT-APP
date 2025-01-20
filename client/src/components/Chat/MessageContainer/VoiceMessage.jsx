import React, { useState, useRef, useEffect } from "react";

import WaveSurfer from "wavesurfer.js";
import pauseImage from "../../../images/icons/pauseIcon.png";
import playIcon from "../../../images/icons/play.png";
import { useMediaQuery } from "react-responsive";
import { AWS_BASE_FILE_PATH } from "../../../utils/URLS";
function VoiceMessage({ file, isSender }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMessage, setAudioMessage] = useState(null);
  const [currentPlayBackTime, setCurrentPlayBackTime] = useState(0);
  const [totalRecordingTime, setTotalRecordingTime] = useState(0);

  const waveFormRef = useRef(null);
  const waveForm = useRef(null);
  const responsiveImageSize = useMediaQuery({ maxWidth: 600 });

  useEffect(() => {
    if (waveForm.current === null) {
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
  }, []);
  useEffect(() => {
    const audioUrl = `${AWS_BASE_FILE_PATH}/messagefiles/${file}`;
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
        <div
          className={`${responsiveImageSize ? "w-52" : "w-72"}`}
          ref={waveFormRef}
          id="waveform"
        ></div>
        <div
          className={`absolute ${
            !isSender && "right-0"
          } bottom-[-24px] text-sm`}
        >
          <span className="ml-2">
            {formatRecordingTime(
              isPlaying ? currentPlayBackTime : totalRecordingTime
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
// export default React.memo(VoiceMessage);
export default VoiceMessage;
