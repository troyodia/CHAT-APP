import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserState } from "../use-contexts/userContext";

export default function RegisterScreen() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const url = "http://localhost:5000/api/v1/auth/register";
  const regsiterUser = async () => {
    try {
      const res = await axios.post(url, {
        firstname,
        lastname,
        email,
        password,
      });
      if (res.data && res.status === 200) {
        navigate("/login");
      }
      // console.log(user);
    } catch (error) {
      setError(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  };
  return (
    <div className=" flex items-center justify-center h-screen text-white bg-cover bg-[url('./images/background.jpg')]">
      <div className="mx-2 flex w-[1000px] h-[700px] justify-center items-center backdrop-blur-sm border-2 border-solid border-transparent rounded">
        <form
          className="mx-4 max-w-[600px] flex flex-col w-full text-2xl"
          onSubmit={(e) => {
            e.preventDefault();
            regsiterUser();
          }}
        >
          <p className="mb-3 text-center text-white font-bold">
            Create an Account
          </p>
          <input
            className="w-full bg-black py-6 px-4 border-2 border-solid border-black rounded mb-6"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          ></input>
          <input
            className="w-full bg-black py-6 px-4 border-2 border-solid border-black  rounded mb-4"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          ></input>
          <input
            className="w-full bg-black py-6 px-4 border-2 border-solid border-black  rounded mb-6"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <input
            className="w-full bg-black py-6 px-4 border-2 border-solid border-black rounded mb-6"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <button className="bg-red-900 py-6 rounded">Register</button>
          {error ? (
            <div>
              <p className="text-red-400 mt-4 text-left text-xl"> {error} </p>
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
}
