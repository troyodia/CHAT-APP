import defaultImg from "../../images/default.png";

export default function UserList() {
  return (
    <div
      className="flex text-white w-full items-center border border-x-0
     border-t-transparent border-b-white/30 px-4 py-4 "
    >
      <div className="w-16 h-16 mr-4">
        <img
          className="w-16 h-16 object-cover rounded-full"
          src={defaultImg}
          alt=""
        ></img>
      </div>
      <div>
        <p className="font-semibold">Jane Doe</p>
        <p className="text-sm">Hello</p>
      </div>
    </div>
  );
}
