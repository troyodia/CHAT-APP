import { useState } from "react";
import defaultImg from "../../images/default.jpeg";
import plusIcon from "../../images/icons/plus.png";

export default function AddNewUserModal() {
  const [search, setSearch] = useState("");
  return (
    <div
      className="absolute flex bg-black p-14 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
     transition ease-in-out delay-200 duration-200 hover:shadow-[0_0px_60px_rgba(0,238,255)] z-[1000]"
    >
      <div className="flex flex-col">
        <form className="flex flex-col">
          <label className="text-lg font-semibold flex mb-4" htmlFor="adduser">
            Add a new direct message
          </label>
          <div className="flex">
            <input
              className="flex w-48 p-4 mr-4 rounded-lg outline-none text-black"
              name="adduser"
              placeholder="username"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></input>

            <button
              className="flex py-4 px-5 font-bold items-center justify-center rounded-lg
         bg-[#00eeff] text-black"
            >
              Search
            </button>
          </div>
        </form>
        <div className="flex mt-8 items-center">
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
        </div>
      </div>
    </div>
  );
}
