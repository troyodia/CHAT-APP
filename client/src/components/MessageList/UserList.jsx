import defaultImg from "../../images/default.jpeg";

export default function UserList() {
  return (
    <div
      className="flex text-white w-full items-center border-0
     px-4 py-2"
    >
      <div className="w-10 h-10 ">
        <img
          className="w-10 h-10 object-cover rounded-full"
          src={defaultImg}
          alt=""
        ></img>
      </div>
      <div className="ml-4">
        <p className="font-semibold text-sm">Jane Doe</p>
        <p className="text-xs">Hello</p>
      </div>
    </div>
  );
}
