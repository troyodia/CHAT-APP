import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UpdateUserState, UserState } from "../use-contexts/userContext";
import GetUser from "../components/GetUser";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const user = UserState();
  const naviagate = useNavigate();
  const updateUserState = UpdateUserState();
  const url = "http://localhost:5000/api/v1/auth/login";
  // const saveToLocalStorage = (token) => {
  //   localStorage.clear();
  //   localStorage.setItem("token", token);
  // };
  const loginUser = async () => {
    try {
      const {
        data: { user },
      } = await axios.post(url, { email, password }, { withCredentials: true });
      // console.log(user);
      setError("");
      updateUserState(user);
      naviagate("/home");
      // saveToLocalStorage(token);
    } catch (error) {
      setError(error.response.data.msg);

      console.log(error.response.data.msg);
    }
  };
  return (
    <div className="bg-amber-100 h-screen flex justify-center items-center">
      <form
        className="m-3 mb-12 flex w-[500px] min-w-[200px] flex-col 
      space-y-3 text-black text-2xl font-medium"
        onSubmit={(e) => {
          e.preventDefault();
          loginUser();
        }}
      >
        {error ? (
          <div>
            <p className="text-red-400 mt-4 text-left text-xl"> {error} </p>
          </div>
        ) : (
          ""
        )}
        <input
          type="text"
          className="rounded px-4 py-4 w-full"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          type="password"
          className="rounded px-4 py-4 w-full"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button className="rounded bg-amber-700 px-4 py-4 text-white">
          Login
        </button>
        <p className="mx-auto text-black pt-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-amber-700">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
