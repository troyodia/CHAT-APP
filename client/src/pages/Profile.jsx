import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import defaultImg from "../images/default.png";
import { UserState } from "../use-contexts/userContext";
import UploadImage from "../components/UploadImage";
import leftArrow from "../images/icons/arrow-left.png";
import { toast } from "react-toastify";

export default function ProfileScreen() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [imgPath, setImgPath] = useState(defaultImg);
  const [imageData, setImageData] = useState("");
  const navigate = useNavigate();
  const formData = new FormData();
  formData.append("firstname", firstname);
  formData.append("lastname", lastname);
  formData.append("email", email);
  // formData.append("password", password);
  formData.append("image", imageData);

  const url = "http://localhost:5000/api/v1/auth/register";
  const regsiterUser = async () => {
    try {
      const res = await axios.post(url, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res);
      if (res.data && res.status === 200) {
        navigate("/login");
      }
      setError("");
      // console.log(user);
    } catch (error) {
      if (error.response.data.msg) {
        //customize error messages here or server
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
      console.log(error.response);
    }
  };
  const updateImgPath = (catchedURL) => {
    setImgPath(catchedURL);
  };
  const updateImgData = (imgData) => {
    setImageData(imgData);
  };
  return (
    // <div className=" flex  items-center justify-center h-screen text-white bg-cover">
    //   <div className="mx-2 flex flex-col w-[900px] h-[800px] justify-center items-center bg-black/30 backdrop-blur-md border-2 border-solid border-transparent rounded">
    //     <p className="mb-6 text-center text-white text-3xl font-bold">
    //       Create an Account
    //     </p>
    //     <UploadImage
    //       imgPath={imgPath}
    //       updateImgPath={updateImgPath}
    //       updateImgData={updateImgData}
    //     ></UploadImage>
    //     <form
    //       className="mx-4 max-w-[600px] flex flex-col md:w-full text-2xl font-bold"
    //       onSubmit={(e) => {
    //         e.preventDefault();
    //         console.log(formData);
    //         regsiterUser();
    //         // if (error) {
    //         //   toast(error, {
    //         //     position: "top-center",
    //         //     autoClose: false,
    //         //     hideProgressBar: false,
    //         //     closeOnClick: true,
    //         //     pauseOnHover: true,
    //         //     draggable: true,
    //         //     progress: undefined,
    //         //     theme: "dark",
    //         //   });
    //         // }
    //       }}
    //     >
    //       <input
    //         className="outline-none w-full bg-black/60 placeholder-white py-6 px-4 border-2 border-solid border-black rounded mb-6"
    //         placeholder="First Name"
    //         value={firstname}
    //         onChange={(e) => {
    //           setFirstname(e.target.value);
    //         }}
    //       ></input>
    //       <input
    //         className="outline-none w-full bg-black/60 placeholder-white py-6 px-4 border-2 border-solid border-black  rounded mb-4"
    //         placeholder="Last Name"
    //         value={lastname}
    //         onChange={(e) => {
    //           setLastname(e.target.value);
    //         }}
    //       ></input>
    //       <input
    //         className="outline-none w-full bg-black/60 placeholder-white py-6 px-4 border-2 border-solid border-black  rounded mb-6"
    //         placeholder="Email"
    //         value={email}
    //         onChange={(e) => {
    //           setEmail(e.target.value);
    //         }}
    //       ></input>
    //       <input
    //         className="outline-none w-full bg-black/60 placeholder-white py-6 px-4 border-2 border-solid border-black rounded mb-6"
    //         type="password"
    //         placeholder="Password"
    //         value={password}
    //         onChange={(e) => {
    //           setPassword(e.target.value);
    //         }}
    //       ></input>
    //       <button className="bg-black py-6 border-white rounded">
    //         Register
    //       </button>
    //     </form>
    //     {/* {error ? (
    //       <div>
    //         <p className="text-white text-center mt-4 mx-4 text-left md:text-xl">
    //           {" "}
    //           {error}{" "}
    //         </p>
    //       </div>
    //     ) : (
    //       ""
    //     )} */}
    //   </div>
    // </div>
    <div className=" flex h-screen justify-center items-center text-white">
      <div className="flex flex-col w-[520px]">
        <div className="w-10">
          <img className="object-cover" src={leftArrow} alt=""></img>
        </div>
        <div className="flex mt-10 mb-10">
          <div className="flex justify-center items-center text-5xl text-sky-400 bg-[#00eeff]/30 w-48 h-48 rounded-full border border-4 border-solid border-sky-400 text-white">
            T
          </div>
          <div className="ml-auto">
            <form
              id="profile"
              className=" mb-12 flex w-full text-white flex-col 
      space-y-3 text-2xl font-medium"
              onSubmit={(e) => {
                e.preventDefault();
                // loginUser();
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
                // naviagate("/profile");
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
                placeholder="First Name"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
              ></input>
              <div className="h-0.5 bg-white"></div>
              <div className="h-4"></div>
              <input
                type="password"
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
          className="rounded bg-[#00eeff] px-4 py-4 text-black font-semibold mt-2"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
