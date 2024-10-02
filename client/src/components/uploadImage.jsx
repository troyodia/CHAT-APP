import { useRef } from "react";
import { UserState } from "../use-contexts/userContext";

export default function UploadImage({ imgPath, updateImgPath }) {
  const fileUploadRef = useRef("");

  const handleFileUpload = (e) => {
    e.preventDefault();
    fileUploadRef.current.click();
  };
  const uploadImageDisplay = () => {
    const file = fileUploadRef.current.files[0];
    const cachedURL = URL.createObjectURL(file);
    updateImgPath(cachedURL);
  };
  return (
    <div className="mb-4 flex items-center">
      <div className="w-20 h-20 mr-8">
        <img
          className="w-20 h-20 object-cover rounded-lg"
          src={imgPath}
          alt=""
        ></img>
      </div>
      <form id="file" encType="multipart/form-data">
        <button
          type="submit"
          className="bg-black flex h-10 pt-1 px-2 rounded-md text-lg"
          onClick={handleFileUpload}
        >
          Upload an Image
        </button>
        <input
          type="file"
          id="file"
          ref={fileUploadRef}
          onChange={uploadImageDisplay}
          hidden
        ></input>
      </form>
    </div>
  );
}
