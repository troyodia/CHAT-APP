import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UpdateUserState, UserState } from "../use-contexts/userContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
        naviagate("/chat");
        setError("");
      }
    } catch (error) {
      setError(error.response.data.msg);

      console.log(error.response.data.msg);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center bg-cover bg-[url('./images/background.jpg')]">
      <div className="text-white mx-2 flex w-[800px] h-[500px] justify-center items-center bg-black/30 backdrop-blur-md border-2 border-solid border-transparent rounded">
        <form
          className="m-3 mb-12 flex w-full max-w-[500px] text-white flex-col 
      space-y-3 text-2xl font-medium"
          onSubmit={(e) => {
            e.preventDefault();
            loginUser();
          }}
        >
          <div>
            <p className="text-center text-3xl text-white font-bold">
              {" "}
              Welcome back,{" "}
            </p>
          </div>
          {error ? (
            <div>
              <p className="text-amber-50 font-bold text-left text-xl">
                {" "}
                {error}{" "}
              </p>
            </div>
          ) : (
            ""
          )}
          <input
            type="text"
            className="rounded px-4 py-4 w-full bg-black/60 placeholder-white"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <input
            type="password"
            className="rounded px-4 py-4 w-full bg-black/60 placeholder-white"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <button className="rounded bg-black px-4 py-4 text-white">
            Log In
          </button>
          <p className="mx-auto pt-2 text-white">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-white font-bold underline underline-offset-6"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
