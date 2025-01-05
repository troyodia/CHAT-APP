import React from "react";
import tickIcon from "../../../images/icons/tickWhite.png";
import { useAppStore } from "../../../store";
import { shallow } from "zustand/shallow";
function RenderUnreadMessages({ messageSender, messageId }) {
  const firstUnreadMessage = useAppStore(
    (state) => state.firstUnreadMessage,
    shallow
  );
  const handleClearFirstUnreadMessage = (id) => {
    const newMap = new Map(firstUnreadMessage);
    newMap.delete(id);
    useAppStore.setState((prev) => ({
      firstUnreadMessage: newMap,
    }));
  };
  return (
    firstUnreadMessage &&
    firstUnreadMessage.get(messageSender) !== undefined &&
    firstUnreadMessage.get(messageSender) === messageId && (
      <div className="flex w-full space-x-4 items-center m">
        <div className="w-full h-0.5 bg-white"></div>
        <button
          className="flex hover:outline-2 hover:outline-dotted p-2 w-full max-w-fit space-x-0.5 items-center"
          onClick={() => handleClearFirstUnreadMessage(messageSender)}
        >
          <span className="font-semibold">New Messages Mark As Read</span>
          <img className="w-6" src={tickIcon} alt=""></img>
        </button>
        <div className="w-full h-0.5 bg-white"></div>
      </div>
    )
  );
}
export default React.memo(RenderUnreadMessages);
