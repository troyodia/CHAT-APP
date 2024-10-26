import defaultImg from "../../images/default.jpeg";
import cameraIcon from "../../images/icons/camera.png";
import phoneIcon from "../../images/icons/phone.png";
import infoIcon from "../../images/icons/i-icon.png";
import picIcon from "../../images/icons/picture.png";
import cameraFooterIcon from "../../images/icons/camerafooter.png";
import microphoneIcon from "../../images/icons/microphone.png";
import emojiIcon from "../../images/icons/emoji.png";
import block from "../../images/icons/block.png";
import settings from "../../images/icons/settingsoption.png";
import Picker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { useBlocker } from "react-router-dom";

export default function Chat({ updateSettings }) {
  const [display, setDisplay] = useState(false);
  const [message, setMessage] = useState("");
  const endRef = useRef("");

  useEffect(() => {
    endRef.current.scrollIntoView({ behaviour: "smooth" });
  }, []);

  return (
    <div className="flex-1 flex flex-col relative">
      <div className="flex h-28  border border-t-transparent border-x-transparent border-b-white/30 w-full items-center">
        <div className="flex items-center">
          <div className="w-16 h-16 ml-8 mr-4">
            <img
              className="w-16 h-16 rounded-full object-cover"
              src={defaultImg}
              alt=""
            ></img>
          </div>
          <div>
            <p className="font-semibold text-xl mx-auto">Jane Doe</p>
          </div>
        </div>

        <div className="flex mr-8 ml-auto">
          <button className="w-7">
            <img src={block} alt=""></img>
          </button>
        </div>
        <div className="flex mr-8 ">
          <button className="w-7" onClick={updateSettings}>
            <img src={settings} alt=""></img>
          </button>
        </div>
      </div>
      <div
        className="flex flex-col h-full overflow-auto scrollbar-hidden scrollbar-hidden::-webkit-scrollbar"
        id="chat-box"
      >
        <div className="mr-auto flex ml-4 mt-4 justify-items">
          <div className="w-12 h-12 mr-5">
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={defaultImg}
              alt=""
            ></img>
          </div>
          <div className="text-left  ">
            <p className="p-4 border border-solid border-white/30 bg-white/10 flex max-w-[700px] rounded-xl">
              It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with
              desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </p>
            <div className="mt-1">55 min ago</div>
          </div>
        </div>
        <div className="ml-auto flex mr-4 mt-4 justify-items">
          <div className="text-right">
            <p className="p-4 border border-solid border-red-600 bg-red-800 flex max-w-[700px] rounded-xl">
              It was popularised in the 1960s
            </p>
            <div className="mt-1 flex">55 min ago</div>
          </div>
        </div>
        <div className="mr-auto flex ml-4 mt-4 justify-items">
          <div className="w-12 h-12 mr-5">
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={defaultImg}
              alt=""
            ></img>
          </div>
          <div className="text-left  ">
            <p className="p-4 border border-solid border-white/30 bg-white/10 flex max-w-[700px] rounded-xl">
              It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with
              desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </p>
            <div className="mt-1">55 min ago</div>
          </div>
        </div>
        <div className="ml-auto flex mr-4 mt-4 justify-items">
          <div className="text-right">
            <p className="p-4 border border-solid border-red-600 bg-red-800 flex max-w-[700px] rounded-xl">
              It was popularised in the 1960s
            </p>
            <div className="mt-1 flex">55 min ago</div>
          </div>
        </div>
        <div className="mr-auto flex ml-4 mt-4 justify-items">
          <div className="w-12 h-12 mr-5">
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={defaultImg}
              alt=""
            ></img>
          </div>
          <div className="text-left  ">
            <p className="p-4 border border-solid border-white/30 bg-white/10 flex max-w-[700px] rounded-xl">
              It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with
              desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </p>
            <div className="mt-1">55 min ago</div>
          </div>
        </div>
        <div className="ml-auto flex mr-4 mt-4 justify-items">
          <div className="text-right">
            <p className="p-4 border border-solid border-red-600 bg-red-800 flex max-w-[700px] rounded-xl">
              It was popularised in the 1960s
            </p>
            <div className="mt-1 flex">55 min ago</div>
          </div>
        </div>
        <div className="mr-auto flex ml-4 mt-4 justify-items">
          <div className="w-12 h-12 mr-5">
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={defaultImg}
              alt=""
            ></img>
          </div>
          <div className="text-left  ">
            <p className="p-4 border border-solid border-white/30 bg-white/10 flex max-w-[700px] rounded-xl">
              It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with
              desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </p>
            <div className="mt-1">55 min ago</div>
          </div>
        </div>
        <div className="ml-auto mt-4 mr-4  max-h-[400px] flex flex-1">
          <img
            className="rounded-xl w-[700px] h-[395px] object-cover"
            src={defaultImg}
            alt=""
          ></img>
        </div>
        <div className="ml-auto flex mr-4 mt-4 justify-items">
          <div className="text-right">
            <p className="p-4 border border-solid border-red-600 bg-red-800 flex max-w-[700px] rounded-xl">
              It was popularised in the 1960s
            </p>
            <div className="mt-1 flex">55 min ago</div>
          </div>
        </div>
        <div className="mb-10" ref={endRef}></div>
      </div>

      <div
        className="flex mt-auto h-32 border border-b-transparent border-x-transparent
       border-t-white/30 w-full items-center "
      >
        <div className="flex mr-auto space-x-3 ml-4">
          <button className="w-8 pt-1">
            <img src={picIcon} alt=""></img>
          </button>
          <button className="w-6 pt-1">
            <img src={cameraFooterIcon} alt=""></img>
          </button>
          <button className="w-7 pt-1">
            <img src={microphoneIcon} alt=""></img>
          </button>
        </div>
        <input
          type="text"
          value={message}
          className="ml-8 flex-1 py-4 pl-4 bg-white/10 rounded-md outline-none text-lg 
          focus:border focus:border-solid  focus:border-white/30 "
          placeholder="Type a message"
          id="input"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></input>
        <button
          className="mx-7 w-8 pt-1"
          onClick={() => {
            setDisplay((prev) => !prev);
          }}
        >
          <img src={emojiIcon} alt=""></img>
        </button>
        <button className=" flex ml-auto mr-4 bg-red-800 justify-center rounded py-3 px-5 font-bold hover:opacity-80">
          Send
        </button>
      </div>
      <div className="absolute bottom-24 right-32">
        <Picker
          open={display}
          onEmojiClick={(emojiData, event) => {
            let pos = document.getElementById("input").selectionStart;
            setMessage(
              (prev) => prev.slice(0, pos) + emojiData.emoji + prev.slice(pos)
            );
            setDisplay(!display);
          }}
        ></Picker>
      </div>
    </div>
  );
}
