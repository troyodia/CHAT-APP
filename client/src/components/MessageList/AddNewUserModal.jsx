import { useState } from "react";
import Lottie from "react-lottie";
import defaultImg from "../../images/default.jpeg";
import plusIcon from "../../images/icons/plus.png";
import * as animationData from "../../lottie/lottie.json";
export default function AddNewUserModal() {
  const [search, setSearch] = useState("");
  const [searchedContacts, setSearchContacts] = useState([]);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div
      className="absolute flex w-[420px] bg-black p-14 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
     transition ease-in-out delay-200 duration-200 hover:shadow-[0_0px_60px_rgba(0,238,255)] z-[1000]"
    >
      <div className="flex flex-col w-full items-center">
        <div className="w-full">
          <div className="flex">
            <input
              className="flex w-full p-3 rounded-lg outline-none text-black"
              name="adduser"
              placeholder="username"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="flex flex-col w-full">
          {/* <div className="flex mt-8 items-center">
            <div className="w-12 h-12 mr-4">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={defaultImg}
                alt=""
              ></img>
            </div>
            <div className="flex font-semibold">John Doe</div>
            <button className="w-7 h-7 flex justify-center ml-auto items-center rounded-md py-1 bg-white/10 ">
              <img className="w-5" src={plusIcon} alt=""></img>
            </button>
          </div> */}
          {searchedContacts.length < 1 && (
            <div className="">
              <Lottie
                options={defaultOptions}
                height={200}
                width={200}
                isClickToPauseDisabled={true}
              />
              <div className="w-full justify-center text-xl font-semibold flex mb-3">
                <p>Add a new &nbsp;</p>
                <span className="text-[#00eeff]">direct message</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
