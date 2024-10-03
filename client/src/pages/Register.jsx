import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import defaultImg from "../images/default.png";
import { UserState } from "../use-contexts/userContext";
import UploadImage from "../components/UploadImage";

export default function RegisterScreen() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [imgPath, setImgPath] = useState(defaultImg);

  const navigate = useNavigate();

  const url = "http://localhost:5000/api/v1/auth/register";
  const regsiterUser = async () => {
    try {
      const res = await axios.post(
        url,
        {
          firstname,
          lastname,
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(res);
      if (res.data && res.status === 200) {
        navigate("/login");
      }
      setError("");
      // console.log(user);
    } catch (error) {
      setError(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  };
  const updateImgPath = (catchedURL) => {
    setImgPath(catchedURL);
  };
  return (
    <div className=" flex  items-center justify-center h-screen text-white bg-cover bg-[url('./images/background.jpg')]">
      <div className="mx-2 flex flex-col w-[900px] h-[800px] justify-center items-center bg-black/30 backdrop-blur-md border-2 border-solid border-transparent rounded">
        <p className="mb-6 text-center text-white text-3xl font-bold">
          Create an Account
        </p>
        <UploadImage
          imgPath={imgPath}
          updateImgPath={updateImgPath}
        ></UploadImage>
        <form
          className="mx-4 max-w-[600px] flex flex-col md:w-full text-2xl font-bold"
          onSubmit={(e) => {
            e.preventDefault();
            regsiterUser();
          }}
        >
          <input
            className="w-full bg-black/60 placeholder-white py-6 px-4 border-2 border-solid border-black rounded mb-6"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          ></input>
          <input
            className="w-full bg-black/60 placeholder-white py-6 px-4 border-2 border-solid border-black  rounded mb-4"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          ></input>
          <input
            className="w-full bg-black/60 placeholder-white py-6 px-4 border-2 border-solid border-black  rounded mb-6"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <input
            className="w-full bg-black/60 placeholder-white py-6 px-4 border-2 border-solid border-black rounded mb-6"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <button className="bg-black py-6 border-white rounded">
            Register
          </button>
        </form>
        {error ? (
          <div>
            <p className="text-white text-center mt-4 mx-4 text-left md:text-xl">
              {" "}
              {error}{" "}
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
