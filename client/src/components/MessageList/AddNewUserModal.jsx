import { useState } from "react";
import defaultImg from "../../images/default.png";

export default function AddNewUserModal() {
  const [search, setSearch] = useState("");
  return (
    <div
      className="absolute flex bg-black/60 p-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    rounded-lg shadow-[0_0px_14px_rgba(225,225,225,0.95)] z-[1000]"
    >
      <div className="flex flex-col">
        <form className="flex flex-col">
          <label className="text-lg font-semibold flex mb-4" htmlFor="adduser">
            Add new user
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
              className="flex py-4 px-5 items-center justify-center rounded-lg
         bg-red-800"
            >
              Search
            </button>
          </div>
        </form>
        <div className="flex mt-8 items-center">
          <div className="w-16 h-16 mr-4">
            <img
              className="w-16 h-16 object-cover rounded-full"
              src={defaultImg}
              alt=""
            ></img>
          </div>
          <div className="flex font-semibold">John Doe</div>
          <button className="flex py-2 px-2 items-center justify-center rounded-lg bg-red-800 ml-auto">
            Add User
          </button>
        </div>
      </div>
    </div>
  );
}
