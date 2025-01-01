import React from "react";
import { useAppStore } from "../../store";
import { shallow, useShallow } from "zustand/shallow";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import logout from "../../images/icons/logout.png";
import pen from "../../images/icons/pen.png";
import { useSocket } from "../../use-contexts/socketContext";
export default function SideBarFooter() {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useAppStore((state) => state.userInfo, shallow);
  const transitionPage = useMediaQuery({ maxWidth: 940 });
  const logOutUrl = "http://localhost:5000/api/v1/auth/logout";
  const socket = useSocket();
  const closeChat = useAppStore((state) => state.closeChat, shallow);
  const setActiveItem = useAppStore((state) => state.setActiveItem, shallow);
  const directMessageContactList = useAppStore(
    (state) => state.directMessageContactList,
    shallow
  );
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
        socket.emit("going-offline", directMessageContactList);
        socket.close();
        navigate("/login");
        closeChat();
        setActiveItem(undefined);
        localStorage.removeItem("isLoggedIn");
      }
    } catch (error) {
      if (error) console.log(error.response.data.msg);
    }
  };
  return (
    <div className="w-full flex items-center px-10 py-2 mt-auto bg-zinc-900">
      <div className={`${transitionPage ? "w-16 h-16" : "w-12 h-12"} mr-4`}>
        {userInfo ? (
          <img
            className="w-full h-full rounded-lg object-cover"
            // src={defaultImg}
            src={`http://localhost:5000/uploads/profiles/${userInfo.image}`}
            alt=""
          ></img>
        ) : (
          ""
        )}
      </div>
      <div
        className={`flex capitalize ${
          transitionPage ? "text-xl" : "text-base"
        } font-semibold max-w-52`}
      >
        {userInfo ? userInfo.firstname + " " + userInfo.lastname : ""}
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
  );
}
