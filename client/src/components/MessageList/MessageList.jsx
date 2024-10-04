import threedots from "../../images/icons/3dots.png";
import cameraIcon from "../../images/icons/camera.png";
import noteIcon from "../../images/icons/note.png";
import defaultImg from "../../images/default.png";
import plusIcon from "../../images/icons/plus.png";
import minusIcon from "../../images/icons/minus.png";
import searchIcon from "../../images/icons/search.png";
import { useState } from "react";
import UserList from "./UserList";
export default function MessageList() {
  const [addFlag, setAddFlag] = useState(false);
  const [buttonIcon, setButtonIcon] = useState(plusIcon);

  return (
    <div className=" flex flex-col items-center w-[350px] border border-y-transparent border-l-transparent border-r-white/30">
      <div className="w-full mt-4 mb-12 flex items-center px-4 ">
        <div className="w-16 h-16 mr-4">
          <img
            className="w-16 h-16 rounded-full object-cover"
            src={defaultImg}
            alt=""
          ></img>
        </div>
        <div className="flex text-lg font-semibold ">John Doe</div>
        <div className="flex space-x-2 ml-auto">
          <div className="w-8">
            <img src={threedots} alt=""></img>
          </div>
          <div className="w-8">
            <img src={cameraIcon} alt=""></img>
          </div>
          <div className="w-6 pt-1">
            <img src={noteIcon} alt=""></img>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center mb-8 px-5">
        <button className="w-8 flex justify-center items-center rounded-l-md py-2 pl-1 bg-white/10">
          <img className="w-6" src={searchIcon} alt=""></img>
        </button>
        <input
          className="mr-5 rounded-r-md flex py-2 pl-4 bg-white/10 outline-none"
          placeholder="Search"
        ></input>
        <button
          className="w-8 h-8 flex justify-center items-center rounded-md py-1 bg-white/10"
          onClick={() => {
            setAddFlag(!addFlag);
          }}
        >
          <img
            className="w-6"
            src={addFlag ? minusIcon : plusIcon}
            alt=""
          ></img>
        </button>
      </div>
      <UserList></UserList>
      <UserList></UserList>
      <UserList></UserList>
      <UserList></UserList>
      <UserList></UserList>
    </div>
  );
}
