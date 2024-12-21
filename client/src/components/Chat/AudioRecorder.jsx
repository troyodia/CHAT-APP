import { useEffect, useRef, useState } from "react";
import trash from "../../images/icons/trash.png";
import sendIcon from "../../images/icons/sendIcon.png";
import pauseIcon from "../../images/icons/pause.png";
import redMicrophone from "../../images/icons/redMicrophone.png";
import pauseImage from "../../images/icons/pauseIcon.png";
import playIcon from "../../images/icons/play.png";
import WaveSurfer from "wavesurfer.js";
import axiosInstance from "../../utils/axiosInstance";
import { useAppStore } from "../../store";
import { useSocket } from "../../use-contexts/socketContext";
import { useShallow } from "zustand/shallow";
export default function AudioRecorder() {
  console.log("audio recorder");
  const [recordedAudio, setRecordedAudio] = useState(null);

  const [recordingDuration, setRecordingDuration] = useState(0);
  const [currentPlayBackTime, setCurrentPlayBackTime] = useState(0);
  const [totalRecordingTime, setTotalRecordingTime] = useState(0);
  const [isRecording, setIsRecording] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [renderedAudio, setRenderedAudio] = useState(null);

  const [waveForm, setWaveForm] = useState(null);
  const waveFormRef = useRef(null);
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const url = "http://localhost:5000/api/v1/messages/uploadAudioFile";
  // const {
  //   selectedChatData,
  //   userInfo,
  //   setUploadedFiles,
  //   uploadedFiles,
  //   reply,
  //   setAudioRecording,
  // } = useAppStore();
  const {
    selectedChatData,
    userInfo,
    setUploadedFiles,
    uploadedFiles,
    reply,
    replyMap,
    setAudioRecording,
    audioRecordingMap,
  } = useAppStore(
    useShallow((state) => ({
      selectedChatData: state.selectedChatData,
      userInfo: state.userInfo,
      setUploadedFiles: state.setUploadedFiles,
      uploadedFiles: state.uploadedFiles,
      reply: state.reply,
      setAudioRecording: state.setAudioRecording,
      audioRecordingMap: state.audioRecordingMap,
      replyMap: state.replyMap,
    }))
  );
  const socket = useSocket();
  useEffect(() => {
    let intervalId;
    if (isRecording) {
      intervalId = setInterval(() => {
        setRecordingDuration((prev) => {
          setTotalRecordingTime(prev + 1);
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRecording]);

  useEffect(() => {
    if (waveFormRef.current) {
      const waveSurfer = WaveSurfer.create({
        container: waveFormRef.current,
        waveColor: "#ffffff",
        progressColor: "gold",
        cursorColor: "white",
        cursorWidth: 1,
        barWidth: 2,
        height: 30,
        responsive: true,
      });
      setWaveForm(waveSurfer);
      waveSurfer.on("finish", () => {
        setIsPlaying(false);
      });
      return () => {
        waveSurfer.destroy();
      };
    }
  }, []);
  useEffect(() => {
    if (waveForm) {
      handleStartRecording();
    }
  }, [waveForm]);

  const handleStartRecording = async () => {
    try {
      setRecordingDuration(0);
      setCurrentPlayBackTime(0);
      setTotalRecordingTime(0);
      setIsRecording(true);
      setRecordedAudio(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioRef.current.srcObject = stream;

      const audioChunks = [];
      mediaRecorder.ondataavailable = (e) => {
        audioChunks.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: "audio/ogg; codecs=opus" });
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        setRecordedAudio(audio);
        waveForm.load(audioUrl);
      };
      mediaRecorder.start();
    } catch (error) {
      console.log("Cannot access microphone", error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      waveForm.stop();

      const audioChunks = [];
      mediaRecorderRef.current.addEventListener("dataavailable", (e) => {
        audioChunks.push(e.data);
      });
      mediaRecorderRef.current.addEventListener("stop", () => {
        const blob = new Blob(audioChunks, { type: "audio/mp3" });
        const audioFile = new File([blob], "recording.mp3");
        setRenderedAudio(audioFile);
      });
    }
  };

  useEffect(() => {
    if (recordedAudio !== null) {
      const updatePlayBackTime = () => {
        setCurrentPlayBackTime(recordedAudio.currentTime);
      };
      recordedAudio.addEventListener("timeupdate", updatePlayBackTime);
      return () =>
        recordedAudio.removeEventListener("timeupdate", updatePlayBackTime);
    }
  }, [recordedAudio]);

  const handlePlayRecording = () => {
    if (recordedAudio) {
      // waveForm.stop();
      waveForm.play();
      recordedAudio.play();
      setIsPlaying(true);
    }
  };
  const handlePauseRecording = () => {
    // waveForm.stop();
    waveForm.pause();
    recordedAudio.pause();
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
  const sendRecording = async () => {
    const formData = new FormData();
    if (renderedAudio) {
      formData.append("audio", renderedAudio);
    } else {
      console.log("no audio file");
    }
    try {
      const res = await axiosInstance.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data && res.status === 200) {
        console.log(res.data.filePath);
        setUploadedFiles([...uploadedFiles, res.data.filePath]);
        socket.emit("sendMessage", {
          sender: userInfo._id,
          recipient: selectedChatData.id,
          content: undefined,
          messageType: "file",
          fileUrl: res.data.filePath,
          contentAndFile: undefined,
          reply: replyMap.get(selectedChatData.id),
          isRecording: true,
        });
        // setAudioRecording(res.data.filePath);
        // setUploadedFiles([]);
        useAppStore.setState((prev) => ({
          audioRecordingMap: new Map(prev.audioRecordingMap).set(
            selectedChatData.id,
            false
          ),
        }));
        useAppStore.setState((prev) => ({
          replyMap: new Map(prev.replyMap).set(selectedChatData.id, undefined),
        }));
      }
    } catch (error) {
      console.log(error?.response?.data?.msg);
    }
  };

  return (
    <div className="flex w-full h-[92px] space-x-4 items-center bg-[#F5DEB3]/20  py-4 justify-end pr-8">
      <button
        className="w-10 hover:outline hover:outline-1 hover:outline-dashed p-1"
        onClick={() => {
          useAppStore.setState((prev) => ({
            audioRecordingMap: new Map(prev.audioRecordingMap).set(
              selectedChatData.id,
              false
            ),
          }));
        }}
      >
        <img className="w-full" src={trash} alt=""></img>
      </button>
      <div className="h-12 rounded-full w-full max-w-80 bg-white/10 flex justify-center items-center text-white text-lg font-bold px-4 border">
        {isRecording ? (
          <div className="animate-pulsing">Recording {recordingDuration}s</div>
        ) : (
          <div className="flex items-center justify-center">
            {recordedAudio &&
              (isPlaying ? (
                <button className="w-7 mr-1" onClick={handlePauseRecording}>
                  <img className="w-full" src={pauseImage} alt=""></img>
                </button>
              ) : (
                <button className="w-7 mr-1" onClick={handlePlayRecording}>
                  <img className="w-full" src={playIcon} alt=""></img>
                </button>
              ))}
          </div>
        )}
        <div
          hidden={isRecording}
          className={` w-60`}
          ref={waveFormRef}
          id="waveform"
        ></div>

        {recordedAudio && isPlaying && (
          <span className="ml-2">
            {formatRecordingTime(currentPlayBackTime)}
          </span>
        )}
        {recordedAudio && !isPlaying && !isRecording && (
          <span className="ml-2">
            {formatRecordingTime(totalRecordingTime)}
          </span>
        )}
        <audio className="hidden" ref={audioRef}></audio>
      </div>

      {isRecording ? (
        <button
          className="w-10 p-1  hover:outline hover:outline-1 hover:outline-dashed"
          onClick={handleStopRecording}
        >
          <img className="w-full" src={pauseIcon} alt=""></img>
        </button>
      ) : (
        <button
          className="w-11  hover:outline hover:outline-1 hover:outline-dashed hover:outline-red-600"
          onClick={handleStartRecording}
        >
          <img className="w-full" src={redMicrophone} alt=""></img>
        </button>
      )}
      {!isRecording && recordedAudio && (
        <button
          className="w-10 hover:outline hover:outline-1 hover:outline-dashed"
          onClick={sendRecording}
        >
          <img className="w-full" src={sendIcon} alt=""></img>
        </button>
      )}
    </div>
  );
}
