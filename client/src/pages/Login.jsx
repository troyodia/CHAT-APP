import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import regsiterImage from "../images/signupimage.png";
import eyeOPen from "../images/icons/eyeopen.png";
import eyeClose from "../images/icons/eyeclosed.png";
import { useAppStore } from "../store";
import { LOGIN_USER_URL, REGISTER_USER_URL } from "../utils/URLS";
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toggle, setToggle] = useState(false);
  const [see, setSee] = useState(false);
  const [seeConfirm, setSeeConfirm] = useState(false);
  const naviagate = useNavigate();
  const location = useLocation();

  const setAuthinfo = useAppStore((state) => state.setAuthinfo);
  const signUpOrLoginUser = async (url) => {
    try {
      const res = await axios.post(
        url,
        { email, password },
        { withCredentials: true }
      );
      if (res.data && res.status === 200) {
        toast.success(
          url.includes("login")
            ? "Logged In Successfully!"
            : "Registered Successfully!, Please set up Profile",
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
        naviagate(url.includes("login") ? "/chat-page" : "/profile", {
          state: { previousUrl: location.pathname },
        });
        setAuthinfo({ user: res.data.user, token: res.data.token });
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
      console.log(error.response.data.msg);
    }
  };
  const validateEntrySignUp = () => {
    if (email && password && confirmPassword) {
      if (confirmPassword === password) {
        signUpOrLoginUser(REGISTER_USER_URL);
      } else {
        toast.error("Passwords do not match", {
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
      if (!password) {
        toast.error("Please provide password", {
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
      if (!confirmPassword) {
        toast.error("Please confirm password", {
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

  const validateEntryLogin = () => {
    if (email && password) {
      signUpOrLoginUser(LOGIN_USER_URL);
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
      if (!password) {
        toast.error("Please provide password", {
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
  return (
    <div className="h-screen flex justify-center items-center bg-black mx-10">
      <div
        className="p-12 text-black flex justify-center items-center bg-black rounded-xl border-2 border-solid border-white transition 
      ease-in-out delay-200 duration-200 hover:shadow-[0_0px_60px_rgba(0,238,255)] rounded h-[650px] w-[550px] md:w-[920px]"
      >
        <div className="flex flex-col w-full md:w-[500px]">
          <div className="">
            <div>
              <p className="text-center text-5xl text-white font-bold mb-4">
                {" "}
                Welcome!{" "}
              </p>
              <p className="text-center text-base text-white font-bold mb-6">
                {" "}
                please fill the form to get started
              </p>
            </div>
            <div className="flex justify-evenly text-base text-white mb-2 font-semibold">
              <button
                className="w-full bg-transparent"
                onClick={() => {
                  setToggle(false);
                  if (toggle) {
                    setEmail("");
                    setPassword("");
                    setSee(false);
                  }
                }}
              >
                Login
              </button>
              <button
                className="w-full bg-transparent"
                onClick={() => {
                  setToggle(true);
                  if (!toggle) {
                    setEmail("");
                    setPassword("");
                    setSee(false);
                  }
                }}
              >
                Signup
              </button>
            </div>
            <div className="flex mb-8">
              <div
                className={`h-0.5 w-1/2 ${
                  !toggle ? "bg-[#00eeff]" : "bg-white"
                }`}
              ></div>
              <div
                className={`h-0.5 w-1/2 ${
                  toggle ? "bg-[#00eeff]" : "bg-white"
                }`}
              ></div>
            </div>
          </div>
          {!toggle ? (
            <form
              className=" mb-12 flex w-full text-white flex-col 
      space-y-3 text-2xl font-medium"
              onSubmit={(e) => {
                e.preventDefault();
                validateEntryLogin();
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
              <div className="flex">
                <input
                  type={see ? "text" : "password"}
                  className="rounded px-4 w-full border-0  bg-black placeholder-white outline-none text-lg"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></input>
                <button
                  type="button"
                  className="w-8 h-8"
                  onClick={() => {
                    setSee((prev) => !prev);
                  }}
                >
                  <img
                    src={see ? eyeOPen : eyeClose}
                    className="object-cover"
                    alt=""
                  ></img>
                </button>
              </div>
              <div className="h-0.5 bg-white"></div>
              <div className="h-1.5"></div>

              <button className="rounded  px-4 py-4 text-black bg-[#00eeff] font-semibold mt-2">
                Log In
              </button>
            </form>
          ) : (
            <form
              className=" mb-12 flex w-full text-white flex-col 
      space-y-3 text-2xl font-medium"
              onSubmit={(e) => {
                e.preventDefault();
                validateEntrySignUp();
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
              <div className="flex">
                <input
                  type={see ? "text" : "password"}
                  className="rounded px-4 w-full border-0  bg-black placeholder-white outline-none text-lg"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></input>
                <button
                  type="button"
                  className="w-8 h-8"
                  onClick={() => {
                    setSee((prev) => !prev);
                  }}
                >
                  <img
                    src={see ? eyeOPen : eyeClose}
                    className="object-cover"
                    alt=""
                  ></img>
                </button>
              </div>
              <div className="h-0.5 bg-white"></div>
              <div className="h-4"></div>
              <div className="flex">
                <input
                  type={seeConfirm ? "text" : "password"}
                  className="rounded px-4 w-full border-0  bg-black placeholder-white outline-none text-lg"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                ></input>
                <button
                  type="button"
                  className="w-8 h-8"
                  onClick={() => {
                    setSeeConfirm((prev) => !prev);
                  }}
                >
                  <img
                    src={seeConfirm ? eyeOPen : eyeClose}
                    className="object-cover"
                    alt=""
                  ></img>
                </button>
              </div>
              <div className="h-0.5 bg-white"></div>
              <div className="h-1.5"></div>

              <button
                type="submit"
                className="rounded bg-[#00eeff] px-4 py-4 text-black font-semibold mt-2"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>

        <div className="hidden md:flex shrink-0 md:ml-20">
          <img className=" " src={regsiterImage} alt=""></img>
        </div>
      </div>
    </div>
  );
}
