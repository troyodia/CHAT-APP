import { useRef, useState } from "react";
import axios from "axios";
export default function UploadImage({ imgPath, updateImgPath }) {
  const fileUploadRef = useRef("");
  const [image, setImage] = useState("");
  const url = "http://localhost:5000/api/v1/auth/uploadsingle";

  const handleFileUpload = (e) => {
    e.preventDefault();
    fileUploadRef.current.click();
  };
  const uploadImageDisplay = async () => {
    const file = fileUploadRef.current.files[0];
    const formData = new FormData();
    console.log(formData);
    formData.append("image", file);
    try {
      const res = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.status === 200) {
        console.log(res);

        const cachedURL = URL.createObjectURL(file);
        updateImgPath(cachedURL);
      }
    } catch (error) {
      console.log(error);
    }
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
      <form
        id="form"
        // action="/uploadsingle"
        // method="POST"
        // encType="multipart/form-data"
      >
        <button
          type="submit"
          className="bg-black flex h-10 pt-1 px-2 rounded-md text-lg font-semibold"
          onClick={handleFileUpload}
        >
          Upload an Image
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
    </div>
  );
}
