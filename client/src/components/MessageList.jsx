import threedots from "../images/icons/3dots.png";
import cameraIcon from "../images/icons/camera.png";
import noteIcon from "../images/icons/note.png";
import defaultImg from "../images/default.png";
export default function MessageList() {
  return (
    <div className="mx-4 flex flex-col items-center w-96 border border-y-transparent border-l-transparent border-r-white/30">
      <div className="w-full mt-4 flex items-center border border-1 border-solid border-white">
        <div className="w-16 h-16 mr-4">
          <img
            className="w-16 h-16 rounded-full object-cover"
            src={defaultImg}
            alt=""
          ></img>
        </div>
        <div className="flex text-xl font-semibold">John Doe</div>
        <div className="flex w-24"></div>
        <div className="flex space-x-2">
          <div className="w-8">
            <img src={threedots} alt=""></img>
          </div>
          <div className="w-8">
            <img src={cameraIcon} alt=""></img>
          </div>
          <div className="w-6 pt-1">
            <img src={noteIcon} alt=""></img>
          </div>
        </div>
      </div>
    </div>
  );
}
