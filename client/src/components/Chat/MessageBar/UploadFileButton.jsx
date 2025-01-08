import React, { useRef, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useAppStore } from "../../../store";
import uploadFile from "../../../images/icons/uploadfile.png";

export default function UploadFileButton({ blockedByUser }) {
  const url = "http://localhost:5000/api/v1/messages/uploadFile";
  const fileUploadRef = useRef(null);
  const selectedChatData = useAppStore((state) => state.selectedChatData);
  const blockedContacts = useAppStore((state) => state.blockedContacts);
  const handleFileAttachementClick = (e) => {
    e.preventDefault();

    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };
  const handleFileUpload = async () => {
    const file = fileUploadRef.current.files[0];
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    } else {
      console.log("no file");
    }
    try {
      const res = await axiosInstance.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data && res.status === 200) {
        console.log(res.data.filePath);

        useAppStore.setState((prev) => ({
          uploadedFilesMap: new Map(prev.uploadedFilesMap).set(
            selectedChatData.id,
            [
              ...(prev.uploadedFilesMap.get(selectedChatData.id) !== undefined
                ? prev.uploadedFilesMap.get(selectedChatData.id)
                : []),
              res.data.filePath,
            ]
          ),
        }));
      }
    } catch (error) {
      console.log("file upload error", error?.response?.data?.msg);
    }
  };
  return (
    <form className="">
      <button
        type="submit"
        className={`w-8 ${
          (blockedContacts?.includes(selectedChatData.id) || blockedByUser) &&
          "cursor-not-allowed"
        }`}
        onClick={handleFileAttachementClick}
        disabled={
          (blockedContacts && blockedContacts.includes(selectedChatData.id)) ||
          blockedByUser
        }
      >
        <img
          className="p-1 hover:outline hover:outline-1 hover:outline-dashed"
          src={uploadFile}
          alt=""
        ></img>
      </button>
      <input
        type="file"
        hidden
        ref={fileUploadRef}
        onChange={handleFileUpload}
      ></input>
    </form>
  );
}
