import { useState } from "react";
import defaultImg from "../../images/default.jpeg";
import { useMediaQuery } from "react-responsive";
import { useAppStore } from "../../store";

export default function UserList({
  image,
  firstname,
  lastname,
  id,
  handleDirectMessageClick,
  isActive,
}) {
  // const [border, setBorder] = useState(false);
  // const handleColor = () => {
  //   setBorder((prev) => !prev);
  const isMobile = useMediaQuery({ maxWidth: 1200 });
  const transitionPage = useMediaQuery({ maxWidth: 940 });
  const { setSelectedChatType, setSelectedChatData } = useAppStore();
  // };
  return (
    <div
      className={`flex w-full items-center 
     px-4 py-2 border border-solid border-transparent rounded-lg hover:border-white ${
       isActive ? "bg-white text-black" : ""
     }`}
      onClick={() => {
        handleDirectMessageClick(id);
        setSelectedChatType("chat");
        setSelectedChatData({
          image,
          firstname,
          lastname,
          id,
        });
      }}
    >
      <div className="w-10 h-10 ">
        <img
          className="w-10 h-10 object-cover rounded-lg"
          src={`http://localhost:5000/uploads/profiles/${image}`}
          alt=""
        ></img>
      </div>
      <div className="ml-4">
        <p
          className={`font-semibold ${
            transitionPage ? "text-xl" : isMobile ? "text-sm" : "text-lg"
          }`}
        >
          {firstname} {lastname}
        </p>
        <p
          className={`${
            transitionPage ? "text-base" : isMobile ? "text-xs" : "text-sm"
          }`}
        >
          Hello
        </p>
      </div>
    </div>
  );
}
