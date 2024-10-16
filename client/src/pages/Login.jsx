import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { UpdateUserState, UserState } from "../use-contexts/userContext";
import "react-toastify/dist/ReactToastify.css";
import regsiterImage from "../images/signupimage.png";
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [toggle, setToggle] = useState(false);
  const naviagate = useNavigate();
  const url = "http://localhost:5000/api/v1/auth/login";

  const loginUser = async () => {
    try {
      const res = await axios.post(
        url,
        { email, password },
        { withCredentials: true }
      );
      if (res.data && res.status === 200) {
        naviagate("/chat-page");
        setError("");
      }
    } catch (error) {
      if (error.response.data.msg) {
        toast(error.response.data.msg, {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      setError(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center bg-black">
      <div className="p-12 text-black flex justify-center items-center bg-black rounded-xl border-2 border-solid border-white shadow-[0_0px_60px_rgba(0,238,255)] rounded h-[650px]">
        <div className="flex-1 flex-col w-[500px]">
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
                }}
              >
                Login
              </button>
              <button
                className="w-full bg-transparent"
                onClick={() => {
                  setToggle(true);
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
                loginUser();
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
                type="password"
                className="rounded px-4 w-full border border-0 bg-black placeholder-white outline-none text-lg"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
              <div className="h-0.5 bg-white"></div>
              <div className="h-1.5"></div>

              <button className="rounded bg-[#00eeff] px-4 py-4 text-black font-semibold mt-2">
                Log In
              </button>
            </form>
          ) : (
            <form
              className=" mb-12 flex w-full text-white flex-col 
      space-y-3 text-2xl font-medium"
              onSubmit={(e) => {
                e.preventDefault();
                // loginUser();
                toast.success("Registered Successfully!", {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
                naviagate("/profile");
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
                type="password"
                className="rounded px-4 w-full border border-0 bg-black placeholder-white outline-none text-lg"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
              <div className="h-0.5 bg-white"></div>
              <div className="h-4"></div>
              <input
                type="password"
                className="rounded px-4 w-full border border-0 bg-black placeholder-white outline-none text-lg"
                placeholder="Confirm Password"
                value={password}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              ></input>
              <div className="h-0.5 bg-white"></div>
              <div className="h-1.5"></div>

              <button className="rounded bg-[#00eeff] px-4 py-4 text-black font-semibold mt-2">
                Log In
              </button>
            </form>
          )}
        </div>

        <div className="flex ml-20">
          <img className="object-cover" src={regsiterImage} alt=""></img>
        </div>
      </div>
    </div>
  );
}
