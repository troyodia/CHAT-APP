import defaultImg from "../../images/default.png";
import arrowUp from "../../images/icons/uparrow.png";
import arrowDown from "../../images/icons/downarrow.png";
import plusIcon from "../../images/icons/plus.png";
import minusIcon from "../../images/icons/minus.png";
import { useState } from "react";

export default function Detail() {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="flex flex-col items-center border border-y-0 border-r-0 border-l-white/30 ml-auto w-[370px]">
      <div className="w-24 h-24 my-4">
        <img
          className="w-24 h-24 rounded-full object-cover"
          src={defaultImg}
          alt=""
        ></img>
      </div>
      <div className="text-center">
        <p className="mb-5 text-xl font-bold">Jane Doe</p>
      </div>
      <div className="flex w-full border border-x-0 border-b-0 border-t-white/30 px-6">
        <ul className="w-full list-none mt-5">
          <li className="flex w-full mb-8 font-semibold">
            <div>Chat Settings</div>
            <button className="w-6 h-6 rounded-full ml-auto bg-white/10 flex items-center justify-center">
              <img className="w-3" src={arrowUp} alt=""></img>
            </button>
          </li>
          <li className="flex w-full mb-8 font-semibold">
            <div>Privacy & Help</div>
            <button className="w-6 h-6 rounded-full ml-auto bg-white/10 flex items-center justify-center">
              <img className="w-3" src={arrowUp} alt=""></img>
            </button>
          </li>
          <li className="flex w-full font-semibold mb-4">
            <div>Shared Photos</div>
            <button
              className="w-6 h-6 rounded-full ml-auto bg-white/10 flex items-center justify-center"
              onClick={() => {
                setToggle((prev) => !prev);
              }}
            >
              <img
                className="w-3"
                src={toggle ? arrowDown : arrowUp}
                alt=""
              ></img>
            </button>
          </li>
          {toggle ? (
            <li className="flex w-full mb-8 h-52 overflow-auto scrollbar-hidden scrollbar-hidden::-webkit-scrollbar">
              <ul className="w-full list-none ">
                <li className="flex w-full items-center font-semibold mb-4">
                  <div className="w-10 h-10 mr-5">
                    <img
                      className="w-10 h-10 rounded-md object-cover"
                      src={defaultImg}
                      alt=""
                    ></img>
                  </div>
                  <div className="text-xs ">Image name from computer input</div>
                  <button className="w-6 h-6 rounded-full ml-auto mr-2 bg-white/10 flex items-center justify-center">
                    <img className="w-3" src={plusIcon} alt=""></img>
                  </button>
                </li>
                <li className="flex w-full items-center font-semibold mb-4">
                  <div className="w-10 h-10 mr-5">
                    <img
                      className="w-10 h-10 rounded-md object-cover"
                      src={defaultImg}
                      alt=""
                    ></img>
                  </div>
                  <div className="text-xs ">Image name from computer input</div>
                  <button className="w-6 h-6 rounded-full ml-auto mr-2 bg-white/10 flex items-center justify-center">
                    <img className="w-3" src={plusIcon} alt=""></img>
                  </button>
                </li>
                <li className="flex w-full items-center font-semibold mb-4">
                  <div className="w-10 h-10 mr-5">
                    <img
                      className="w-10 h-10 rounded-md object-cover"
                      src={defaultImg}
                      alt=""
                    ></img>
                  </div>
                  <div className="text-xs ">Image name from computer input</div>
                  <button className="w-6 h-6 rounded-full ml-auto mr-2 bg-white/10 flex items-center justify-center">
                    <img className="w-3" src={plusIcon} alt=""></img>
                  </button>
                </li>
                <li className="flex w-full items-center font-semibold mb-4">
                  <div className="w-10 h-10 mr-5">
                    <img
                      className="w-10 h-10 rounded-md object-cover"
                      src={defaultImg}
                      alt=""
                    ></img>
                  </div>
                  <div className="text-xs ">Image name from computer input</div>
                  <button className="w-6 h-6 rounded-full ml-auto mr-2 bg-white/10 flex items-center justify-center">
                    <img className="w-3" src={plusIcon} alt=""></img>
                  </button>
                </li>
                <li className="flex w-full items-center font-semibold mb-4">
                  <div className="w-10 h-10 mr-5">
                    <img
                      className="w-10 h-10 rounded-md object-cover"
                      src={defaultImg}
                      alt=""
                    ></img>
                  </div>
                  <div className="text-xs">Image name from computer input</div>
                  <button className="w-6 h-6 rounded-full ml-auto mr-2 bg-white/10 flex items-center justify-center">
                    <img className="w-3" src={plusIcon} alt=""></img>
                  </button>
                </li>
              </ul>
            </li>
          ) : (
            <li className="mt-8"></li>
          )}

          <li className="flex w-full mb-8 font-semibold">
            <div>Shared Files</div>
            <button className="w-6 h-6 rounded-full ml-auto bg-white/10 flex items-center justify-center">
              <img className="w-3" src={arrowUp} alt=""></img>
            </button>
          </li>
        </ul>
      </div>
      {/* <div className="flex flex-col w-full mt-auto px-6 font-bold text-lg mb-7">
        <button className="text-center py-4 bg-red-800 rounded-md mb-6 hover:opacity-80">
          Block User
        </button>
        <button className="text-center py-2 bg-sky-800 rounded-md hover:opacity-80">
          Logout
        </button>
      </div> */}
    </div>
  );
}
