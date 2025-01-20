import React, { useEffect, useRef } from "react";
import { useAppStore } from "../../../store";
import Picker from "emoji-picker-react";

export default function Emoji({ displayEmoji, setDisplayEmojiPicker }) {
  const emojiRef = useRef(null);
  const selectedChatData = useAppStore((state) => state.selectedChatData);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setDisplayEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef, setDisplayEmojiPicker]);
  const handleEmoji = (emojiData) => {
    let pos = document.getElementById("input").selectionStart;
    useAppStore.setState((prev) => ({
      messageMap: new Map(prev.messageMap).set(
        selectedChatData.id,
        prev.messageMap.get(selectedChatData.id) !== undefined
          ? prev.messageMap.get(selectedChatData.id).slice(0, pos) +
              emojiData.emoji +
              prev.messageMap.get(selectedChatData.id).slice(pos)
          : emojiData.emoji
      ),
    }));
  };
  return (
    <div className="absolute bottom-24 right-32 z-10" ref={emojiRef}>
      <Picker
        open={displayEmoji}
        theme="dark"
        autoFocusSearch={true}
        onEmojiClick={(emojiData, event) => {
          handleEmoji(emojiData);
        }}
      ></Picker>
    </div>
  );
}
