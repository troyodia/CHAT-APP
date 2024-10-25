import threedots from "../../images/icons/3dots.png";
import cameraIcon from "../../images/icons/camera.png";
import noteIcon from "../../images/icons/note.png";
import defaultImg from "../../images/default.jpeg";
import plusIcon from "../../images/icons/plus.png";
import minusIcon from "../../images/icons/minus.png";
import searchIcon from "../../images/icons/search.png";
import logout from "../../images/icons/logout.png";
import pen from "../../images/icons/pen.png";
import rasengan from "../../images/icons/rasengan.png";
import { useEffect, useState } from "react";
import UserList from "./UserList";
import AddNewUserModal from "./AddNewUserModal";
export default function MessageList() {
  const [addFlag, setAddFlag] = useState(false);
  const [display, setDisplay] = useState(false);
  const [addFlagChannel, setAddFlagChannel] = useState(false);
  const [displayChannel, setDisplayChannel] = useState(false);

  const [showSearch, setShowSearch] = useState(false);
  const [showSearchChannel, setShowSearchChannel] = useState(false);

  const [activeItem, setActiveItem] = useState("");
  const handleDirectMessageClick = (id) => {
    activeItem === id ? setActiveItem(id) : setActiveItem(id);
  };
  const defualtDirectMessages = [
    {
      image: defaultImg,
      firstname: "jane",
      lastname: "Doe",
      id: "1",
    },
    {
      image: defaultImg,
      firstname: "jane",
      lastname: "Doe",
      id: "2",
    },
    {
      image: defaultImg,
      firstname: "jane",
      lastname: "Doe",
      id: "3",
    },
  ];
  return (
    <>
      <div
        className="relative flex flex-col items-center w-[370px] border 
      border-y-transparent border-l-transparent border-r-white/30"
      >
        <div className="flex items-center w-full mt-2 mb-4">
          <div className="w-24 ml-4">
            <img src={rasengan} alt=""></img>
          </div>
          <div className="font-bold text-2xl">Rasengan</div>
        </div>
        <div className="flex flex-col w-full  items-center px-10 mb-10">
          <div className="flex w-full mb-4">
            <div className="text-zinc-600 font-semibold text-base ">
              DIRECT MESSAGES
            </div>
            <div className="flex ml-auto space-x-3">
              <button
                className="w-6 h-6  flex justify-center items-center rounded-md bg-white/10"
                onClick={() => {
                  setShowSearch((prev) => !prev);
                }}
              >
                <img className="w-5" src={searchIcon} alt=""></img>
              </button>
              <button
                className="w-6 h-6 flex justify-center  items-center rounded-md py-1 bg-white/10 "
                onClick={() => {
                  setAddFlag((prev) => !prev);
                  setDisplay((prev) => !prev);
                }}
              >
                <img
                  className="w-4"
                  src={addFlag ? minusIcon : plusIcon}
                  alt=""
                ></img>
              </button>
            </div>
          </div>
          {showSearch ? (
            <div className="flex w-full  mb-2">
              <input
                className="max-w-56 rounded-md flex-1 py-2 pl-5 bg-white/10 outline-none 
          border border-transparent focus:border focus:border-solid  focus:border-white/30"
                placeholder="Search"
              ></input>
            </div>
          ) : (
            ""
          )}
          <div className="w-full space-y-2 max-h-48 overflow-auto scrollbar-hidden scrollbar-hidden::-webkit-scrollbar">
            {defualtDirectMessages.map((item) => {
              return (
                <UserList
                  image={item.image}
                  firstname={item.firstname}
                  lastname={item.lastname}
                  id={item.id}
                  handleDirectMessageClick={handleDirectMessageClick}
                  isActive={activeItem === item.id}
                  key={item.id}
                ></UserList>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col w-full  items-center px-10 mb-10">
          <div className="flex w-full mb-4">
            <div className="text-zinc-600 font-semibold text-base ">
              CHANNELS
            </div>
            <div className="flex ml-auto space-x-3">
              <button
                className="w-6 h-6  flex justify-center items-center rounded-md bg-white/10"
                onClick={() => {
                  setShowSearchChannel((prev) => !prev);
                }}
              >
                <img className="w-5" src={searchIcon} alt=""></img>
              </button>
              <button
                className="w-6 h-6 flex justify-center  items-center rounded-md py-1 bg-white/10 "
                onClick={() => {
                  setAddFlagChannel((prev) => !prev);
                  setDisplayChannel((prev) => !prev);
                }}
              >
                <img
                  className="w-4"
                  src={addFlagChannel ? minusIcon : plusIcon}
                  alt=""
                ></img>
              </button>
            </div>
          </div>
          {showSearchChannel ? (
            <div className="flex w-full  mb-2">
              <input
                className="max-w-56 rounded-md flex-1 py-2 pl-5 bg-white/10 outline-none 
          border border-transparent focus:border focus:border-solid  focus:border-white/30"
                placeholder="Search"
              ></input>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* <div className="flex w-full justify-center items-center px-10">
          <div className="text-zinc-600 font-semibold text-base mr-28">
            CHANNELS
          </div>
          <div className="flex ml-auto space-x-3">
            <button
              className="w-6 h-6  flex justify-center items-center rounded-md bg-white/10"
              onClick={() => {
                setShowSearchChannel((prev) => !prev);
              }}
            >
              <img className="w-5" src={searchIcon} alt=""></img>
            </button>
            <button
              className="w-6 h-6 flex justify-center  items-center rounded-md py-1 bg-white/10 "
              onClick={() => {
                setAddFlagChannel((prev) => !prev);
                setDisplayChannel((prev) => !prev);
              }}
            >
              <img
                className="w-4"
                src={addFlagChannel ? minusIcon : plusIcon}
                alt=""
              ></img>
            </button>
          </div>
          {showSearchChannel ? (
            <div className="flex  border border-solid w-full mb-2 mx-2">
              <input
                className="max-w-56 rounded-md flex-1 py-2 pl-5 bg-white/10 outline-none 
          border border-transparent focus:border focus:border-solid  focus:border-white/30 "
                placeholder="Search"
              ></input>
            </div>
          ) : (
            ""
          )}
        </div> */}

        {/* <div className="w-full flex items-center mb-8 px-5"> */}
        {/* <button
            className="w-8 flex justify-center items-center rounded-l-md py-2 pl-1 bg-white/10
        border border-transparent focus:border focus:border-solid  focus:border-white/30"
          >
            <img className="w-6" src={searchIcon} alt=""></img>
          </button> */}
        {/* <input
            className="mr-6 rounded-r-md flex-1 py-2 pl-5 bg-white/10 outline-none 
          border border-transparent focus:border focus:border-solid  focus:border-white/30"
            placeholder="Search"
          ></input> */}
        {/* <button
            className="w-8 h-8 flex justify-center items-center rounded-md py-1 bg-white/10 ml-auto"
            onClick={() => {
              setAddFlag((prev) => !prev);
              setDisplay((prev) => !prev);
            }}
          >
            <img
              className="w-6"
              src={addFlag ? minusIcon : plusIcon}
              alt=""
            ></img>
          </button> */}
        {/* </div> */}
        {/* <UserList></UserList>
        <UserList></UserList>
        <UserList></UserList>
        <UserList></UserList>
        <UserList></UserList> */}
        <div className="w-full flex items-center px-10 py-2 mt-auto bg-zinc-900">
          <div className="w-12 h-12 mr-4">
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={defaultImg}
              alt=""
            ></img>
          </div>
          <div className="flex text-base font-semibold ">John Doe</div>
          <div className="flex space-x-3 ml-auto">
            <button className="w-5">
              <img src={pen} alt=""></img>
            </button>
            <button className="w-10 pt-1">
              <img src={logout} alt=""></img>
            </button>
          </div>
        </div>
      </div>
      {display ? <AddNewUserModal></AddNewUserModal> : ""}
      {displayChannel ? <AddNewUserModal></AddNewUserModal> : ""}
    </>
  );
}
