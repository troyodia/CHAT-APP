import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UploadImage from "../components/UploadImage";
import leftArrow from "../images/icons/arrow-left.png";
import trash from "../images/icons/trash.png";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { CREATE_PROFILE_URL, DELETE_PROFILE_IMAGE_URL } from "../utils/URLS";
import { useAppStore } from "../store";
export default function ProfileScreen() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [imageData, setImageData] = useState("");
  const [imagePath, setImagePath] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const createProfile = async () => {
    try {
      const res = await axiosInstance.post(
        CREATE_PROFILE_URL,
        { email, firstname, lastname },
        { withCredentials: true }
      );
      if (res.data && res.status === 200) {
        navigate("/chat-page");
        useAppStore.setState((prev) => ({
          authInfo: { ...prev.authInfo, profileSetup: true },
        }));
        toast.success("Profile Completed!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      if (error.response.data.msg) {
        toast.error(error.response.data.msg, {
          position: "top-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };
  const validateProfile = () => {
    if (email && firstname && lastname && imageData) {
      createProfile();
    } else {
      if (!email) {
        toast.error("Please provide email", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      if (!firstname) {
        toast.error("Please provide first name", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      if (!lastname) {
        toast.error("please provide last name", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      if (!imageData) {
        toast.error("please provide profile image", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };
  const updateImgData = (imgData, imagePath) => {
    setImageData(imgData);
    setImagePath(imagePath);
  };
  const deleteProfileImage = async () => {
    try {
      const res = await axiosInstance.post(
        DELETE_PROFILE_IMAGE_URL,
        { filename: imagePath },
        {
          withCredentials: true,
        }
      );
      if (res.data && res.status === 200) {
        setImageData("");
      }
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  return (
    <div className=" flex h-screen justify-center items-center text-white px-10">
      <div className="flex flex-col w-[300px] md:w-[520px]">
        <button
          className="w-10"
          onClick={() => {
            if (location.state) navigate(location.state.previousUrl);
            else {
              navigate("/login");
            }
          }}
        >
          <img className="object-cover" src={leftArrow} alt=""></img>
        </button>
        <div className="flex flex-col items-center md:flex-row mt-10 mb-14">
          <div
            className={
              !imageData
                ? `group/item relative flex justify-center items-center font-semibold
              text-5xl text-sky-400 hover:text-sky-700 bg-[#00eeff]/55 hover:bg-[#00eeff]/30 w-48 h-48 rounded-full
              border border-4 border-solid border-sky-400 hover:border-sky-800 text-white mb-10 md:mb-0`
                : "border-0 bg-transparent hover:opacity-70"
            }
          >
            <div className={imageData ? "hidden" : "flex"}>
              T <UploadImage updateImgData={updateImgData}></UploadImage>
            </div>
            <div
              className={
                imageData ? "group/subitem relative flex w-48 h-48 " : "hidden"
              }
            >
              <img
                src={imageData}
                className="rounded-full w-48 h-48 object-cover"
                alt=""
              ></img>
              <button
                className="invisible group-hover/subitem:visible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                onClick={deleteProfileImage}
              >
                <img src={trash} alt="" className="w-12"></img>
              </button>
            </div>
          </div>
          <div className="md:ml-auto">
            <form
              id="profile"
              className="flex w-full text-white flex-col 
      space-y-3 text-2xl font-meduim"
              onSubmit={(e) => {
                e.preventDefault();
                validateProfile();
              }}
            >
              <input
                type="text"
                className="rounded px-4 w-full border border-0 bg-black placeholder-white outline-none text-lg"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
              <div className="h-0.5 bg-white"></div>
              <div className="h-4"></div>
              <input
                className="rounded px-4 w-full border border-0 bg-black placeholder-white outline-none text-lg"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
              ></input>
              <div className="h-0.5 bg-white"></div>
              <div className="h-4"></div>
              <input
                className="rounded px-4 w-full border border-0 bg-black placeholder-white outline-none text-lg"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              ></input>
              <div className="h-0.5 bg-white"></div>
              <div className="h-1.5"></div>
            </form>
          </div>
        </div>
        <button
          type="submit"
          form="profile"
          className="rounded bg-[#00eeff] px-4 py-4 text-black font-semibold mt-2 hover:bg-[#00eeff]/80"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
