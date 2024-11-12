import threedots from "../../images/icons/3dots.png";
import cameraIcon from "../../images/icons/camera.png";
import noteIcon from "../../images/icons/note.png";
import defaultImg from "../../images/default.jpeg";
import plusIcon from "../../images/icons/plus.png";
import minusIcon from "../../images/icons/minus.png";
import searchIcon from "../../images/icons/search.png";
import logout from "../../images/icons/logout.png";
import pen from "../../images/icons/pen.png";
import rasengan from "../../images/icons/newrasengan.png";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { useMediaQuery } from "react-responsive";

import UserList from "./UserList";
import AddNewUserModal from "./AddNewUserModal";
import AddNewChannelModal from "./AddNewChannel";
import axiosInstance from "../../utils/axiosInstance";
import { UpdateUserState } from "../../use-contexts/userContext";

export default function MessageList({ displayToggle }) {
  const [addFlag, setAddFlag] = useState(false);
  const [display, setDisplay] = useState(false);
  const [addFlagChannel, setAddFlagChannel] = useState(false);
  const [displayChannel, setDisplayChannel] = useState(false);

  const [showSearch, setShowSearch] = useState(false);
  const [showSearchChannel, setShowSearchChannel] = useState(false);

  const [activeItem, setActiveItem] = useState("");
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
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
  const isMobile = useMediaQuery({ maxWidth: 1200 });
  const transitionPage = useMediaQuery({ maxWidth: 940 });
  const lg = useMediaQuery({ maxWidth: 1006 });
  const md = useMediaQuery({ maxWidth: 768 });

  const logOutUrl = "http://localhost:5000/api/v1/auth/logout";
  const contactListUrl =
    "http://localhost:5000/api/v1/contactList/getContactList";
  const loggOutUser = async () => {
    try {
      const res = await axiosInstance(logOutUrl, { withCredentials: true });
      if (res.data && res.status === 200) {
        toast.success("Logged Out Successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/login");
        localStorage.removeItem("isLoggedIn");
      }
    } catch (error) {
      if (error) console.log(error.response.data.msg);
    }
  };
  const closeModal = () => {
    setAddFlag((prev) => !prev);
    setDisplay((prev) => !prev);
  };
  // const addContacttoList = (contact) => {
  //   setContacts([...contacts, contact]);
  // };
  useEffect(() => {
    const getContactList = async () => {
      try {
        const res = await axiosInstance.get(contactListUrl, {
          withCredentials: true,
        });
        if (res.data && res.status === 200) {
          // console.log(res.data.contactList);
          setContacts(res.data.contactList);
        }
      } catch (error) {
        console.log(error?.response?.data?.msg);
      }
    };
    getContactList();
  });
  // useEffect(() => {
  //   console.log(contacts);
  // }, [contacts]);
  return (
    <>
      <div
        className={`relative flex flex-col items-center ${
          transitionPage ? "w-full" : lg ? "w-[350px]" : "w-[450px]"
        }  border-0 bg-[#010103]`}
      >
        <div className="flex items-center w-full mt-2 mb-4 space-x-2">
          <div className="w-24 ml-4">
            <img
              className="transition ease-in-out delay-150 duration-300 hover:scale-[1.1]"
              src={rasengan}
              alt=""
            ></img>
          </div>
          <div className="font-bold text-3xl">Rasengan</div>
        </div>
        <div className="flex flex-col w-full items-center px-10 mb-10">
          <div className="flex w-full mb-4">
            <div
              className={`text-zinc-600 font-semibold ${
                transitionPage ? "text-2xl" : isMobile ? "text-lg" : "text-2xl"
              }`}
            >
              DIRECT MESSAGES
            </div>
            <div className="flex ml-auto space-x-3 my-auto">
              <button
                className="w-6 h-6 flex justify-center items-center rounded-md bg-white/10"
                onClick={() => {
                  setShowSearch((prev) => !prev);
                }}
              >
                <img className="w-5" src={searchIcon} alt=""></img>
              </button>
              <button
                className="w-6 h-6 flex justify-center items-center rounded-md py-1 bg-white/10 "
                onClick={() => {
                  if (!addFlagChannel) {
                    setAddFlag((prev) => !prev);
                    setDisplay((prev) => !prev);
                  }
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
                className=" rounded-md flex-1 py-2 pl-5 bg-white/10 outline-none 
          border border-transparent focus:border focus:border-solid  focus:border-white/30"
                placeholder="Search"
              ></input>
            </div>
          ) : (
            ""
          )}
          <div className="w-full bg-[#0E0E10] rounded-lg space-y-2 max-h-56 overflow-auto scrollbar-hidden scrollbar-hidden::-webkit-scrollbar">
            {contacts.length > 0 &&
              contacts.map((item) => {
                return (
                  <UserList
                    image={item.image}
                    firstname={item.firstname}
                    lastname={item.lastname}
                    id={item._id}
                    handleDirectMessageClick={handleDirectMessageClick}
                    isActive={activeItem === item._id}
                    key={item._id}
                  ></UserList>
                );
              })}
          </div>
        </div>
        <div className="flex flex-col w-full items-center px-10 mb-10">
          <div className="flex w-full mb-4">
            <div
              className={`text-zinc-600 font-semibold ${
                transitionPage ? "text-2xl" : isMobile ? "text-lg" : "text-2xl"
              }`}
            >
              CHANNELS
            </div>
            <div className="flex ml-auto space-x-3 my-auto">
              <button
                className="w-6 h-6  flex justify-center items-center rounded-md bg-white/10"
                onClick={() => {
                  setShowSearchChannel((prev) => !prev);
                }}
              >
                <img className="w-5" src={searchIcon} alt=""></img>
              </button>
              <button
                className="w-6 h-6 flex justify-center items-center rounded-md py-1 bg-white/10 "
                onClick={() => {
                  if (!addFlag) {
                    setAddFlagChannel((prev) => !prev);
                    setDisplayChannel((prev) => !prev);
                  }
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
            <div className="flex w-full mb-2">
              <input
                className=" rounded-md flex-1 py-2 pl-5 bg-white/10 outline-none 
          border border-transparent focus:border focus:border-solid  focus:border-white/30"
                placeholder="Search"
              ></input>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="w-full flex items-center px-10 py-2 mt-auto bg-zinc-900">
          <div className={`${transitionPage ? "w-16 h-16" : "w-12 h-12"} mr-4`}>
            <img
              className="w-full h-full rounded-lg object-cover"
              src={defaultImg}
              alt=""
            ></img>
          </div>
          <div
            className={`flex ${
              transitionPage ? "text-xl" : "text-base"
            } font-semibold`}
          >
            John Doe
          </div>
          <div className="flex space-x-3 ml-auto">
            <button
              className={`group relative ${transitionPage ? "w-7" : "w-5"}`}
              onClick={() => {
                navigate("/profile", {
                  state: {
                    previousUrl: location.pathname,
                  },
                });
              }}
            >
              <img src={pen} alt=""></img>
              <span
                className="w-24 p-2 bottom-4 left-1/2 -translate-x-1/2 -translate-y-1/2 
              text-sm text-black bg-white hidden group-hover:flex group-hover:justify-center absolute rounded-lg"
              >
                Edit Profile
              </span>
            </button>
            <button
              className={`group relative ${
                transitionPage ? "w-14 pt-1" : "w-10 pt-1"
              }`}
              onClick={loggOutUser}
            >
              <img src={logout} alt=""></img>
              <span
                className=" w-16 p-2 bottom-4 left-1/2 -translate-x-1/2 -translate-y-1/2 
              text-sm text-black bg-white hidden group-hover:flex group-hover:justify-center absolute rounded-lg"
              >
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>
      {display ? (
        <AddNewUserModal
          closeModal={closeModal}
          displayToggle={displayToggle}
        ></AddNewUserModal>
      ) : (
        ""
      )}
      {displayChannel ? <AddNewChannelModal></AddNewChannelModal> : ""}
    </>
  );
}
