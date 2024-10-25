import { useState } from "react";
import defaultImg from "../../images/default.jpeg";

export default function UserList({
  image,
  firstname,
  lastname,
  id,
  handleDirectMessageClick,
  isActive,
}) {
  // const [border, setBorder] = useState(false);
  // const handleColor = () => {
  //   setBorder((prev) => !prev);
  // };
  return (
    <div
      className={`flex w-full items-center 
     px-4 py-2 border border-solid border-transparent hover:border-white ${
       isActive ? "bg-white text-black" : ""
     }`}
      onClick={() => handleDirectMessageClick(id)}
    >
      <div className="w-10 h-10 ">
        <img
          className="w-10 h-10 object-cover rounded-full"
          src={image}
          alt=""
        ></img>
      </div>
      <div className="ml-4">
        <p className="font-semibold text-sm">
          {firstname} {lastname}
        </p>
        <p className="text-xs">Hello</p>
      </div>
    </div>
  );
}
