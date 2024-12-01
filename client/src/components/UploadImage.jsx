import { useRef, useState } from "react";
import plusIcon from "../images/icons/uploadwhite.png";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
export default function UploadImage({ updateImgData }) {
  const fileUploadRef = useRef("");
  const [image, setImage] = useState("");
  const url = "http://localhost:5000/api/v1/auth/add-profile-image";

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (fileUploadRef.current) fileUploadRef.current.click();
  };
  const uploadImageDisplay = async () => {
    const file = fileUploadRef.current.files[0];
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
      const reader = new FileReader();
      reader.onload = () => {
        updateImgData(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      console.log("no file");
      return;
    }

    try {
      const res = await axiosInstance.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data && res.status === 200) {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  return (
    // <div className="mb-4 flex items-center">
    <form
      id="form"
      // action="/uploadsingle"
      // method="POST"
      // encType="multipart/form-data"
    >
      <button
        type="submit"
        className="invisible group-hover/item:visible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        onClick={handleFileUpload}
      >
        <img className="w-10" src={plusIcon} alt=""></img>
      </button>
      <input
        type="file"
        id="file"
        name="images"
        ref={fileUploadRef}
        onChange={uploadImageDisplay}
        hidden
      ></input>
    </form>
    // </div>
  );
}
