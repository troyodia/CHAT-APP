import { useRef } from "react";
import plusIcon from "../images/icons/uploadwhite.png";

import axiosInstance from "../utils/axiosInstance";
import { ADD_USER_PROFILE_IMAGE_URL } from "../utils/URLS";
import { toast } from "react-toastify";

export default function UploadImage({ updateImgData }) {
  const fileUploadRef = useRef("");
  const handleFileUpload = (e) => {
    e.preventDefault();
    if (fileUploadRef.current) fileUploadRef.current.click();
  };
  const uploadImageDisplay = async () => {
    const file = fileUploadRef.current.files[0];
    const formData = new FormData();
    const reader = new FileReader();
    if (file) {
      formData.append("image", file);
      try {
        const res = await axiosInstance.post(
          ADD_USER_PROFILE_IMAGE_URL,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        if (res.data && res.status === 200) {
          console.log(res.data);
          reader.onload = () => {
            updateImgData(reader.result, res.data.image);
            console.log(
              "this is the profile page image upload path" + reader.result
            );
          };
          reader.readAsDataURL(file);
        }
      } catch (error) {
        console.log(error.response.data.msg);
        toast.error(error.response.data.msg, {
          position: "top-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      console.log("no file");
    }
  };

  return (
    <form id="form">
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
  );
}
