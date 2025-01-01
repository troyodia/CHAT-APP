import defaultImg from "../../images/default.png";
import arrowUp from "../../images/icons/uparrow.png";
import arrowDown from "../../images/icons/downarrow.png";
import plusIcon from "../../images/icons/plus.png";
import minusIcon from "../../images/icons/minus.png";
import downloadIcon from "../../images/icons/download.png";
import fileImage from "../../images/icons/myfile.png";

import { useCallback, useEffect, useState } from "react";
import { useAppStore } from "../../store";
import { shallow, useShallow } from "zustand/shallow";
import axiosInstance from "../../utils/axiosInstance";
import { isImage } from "../../utils/isImage";
import { v4 as uuidv4 } from "uuid";
import { useSocket } from "../../use-contexts/socketContext";

export default function Detail() {
  const getMessagesURL = "http://localhost:5000/api/v1/messages/getMessages";

  const [imagesToggle, setImagesToggle] = useState(false);
  const [filesToggle, setFilesToggle] = useState(false);

  const [filesArr, setFilesArr] = useState([]);
  const [imagesArr, setImagesArr] = useState([]);

  const downloadFile = useAppStore((state) => state.downloadFile, shallow);
  const handleSetFileArray = useCallback(
    (imageArrCopy, filesArrCopy, files) => {
      files.forEach((file) => {
        if (isImage(file)) {
          !imageArrCopy.includes(file) && imageArrCopy.push(file);
        } else {
          !filesArrCopy.includes(file) && filesArrCopy.push(file);
        }
      });
    },
    []
  );
  const socket = useSocket();
  const { selectedChatData, setSelectedChatMessages } = useAppStore(
    useShallow((state) => ({
      selectedChatData: state.selectedChatData,
      setSelectedChatMessages: state.setSelectedChatMessages,
    }))
  );
  useEffect(() => {
    const selectedChatData = useAppStore.getState().selectedChatData;
    const getChatFiles = async () => {
      try {
        const res = await axiosInstance.post(
          getMessagesURL,
          { contactId: selectedChatData.id },
          { withCredentials: true }
        );
        if (res.data && res.status === 200) {
          const arrayCopyImages = [];
          const arrayCopyFiles = [];

          res.data.forEach((message) => {
            if (message.messageType === "file") {
              handleSetFileArray(
                arrayCopyImages,
                arrayCopyFiles,
                message.fileUrl
              );
            } else if (message.messageType === "combined") {
              handleSetFileArray(
                arrayCopyImages,
                arrayCopyFiles,
                message.contentAndFile.files
              );
            }
          });
          setImagesArr(arrayCopyImages);
          setFilesArr(arrayCopyFiles);
        }
      } catch (error) {
        console.log(error?.response?.data?.msg);
      }
    };
    if (selectedChatData) {
      getChatFiles();
    }
  }, [handleSetFileArray, selectedChatData, setSelectedChatMessages]);

  return (
    <div className="flex flex-col items-center border border-y-0 border-r-0 border-l-white/30 ml-auto w-[300px]">
      <div className="w-24 h-24 my-4">
        <img
          className="w-24 h-24 rounded-full object-cover"
          src={`http://localhost:5000/uploads/profiles/${selectedChatData?.image}`}
          alt=""
        ></img>
      </div>
      <div className="text-center">
        <p className="mb-5 text-xl font-bold capitalize">
          {selectedChatData?.firstname + " " + selectedChatData?.lastname}
        </p>
      </div>
      <div className="flex w-full border border-x-0 border-b-0 border-t-white/30 px-6">
        <ul className="w-full list-none mt-5">
          <li className="flex w-full font-semibold mb-4">
            <div>Shared Photos</div>
            <button
              className="w-6 h-6 rounded-full ml-auto bg-white/10 flex items-center justify-center"
              onClick={() => {
                setImagesToggle((prev) => !prev);
              }}
            >
              <img
                className="w-3"
                src={imagesToggle ? arrowDown : arrowUp}
                alt=""
              ></img>
            </button>
          </li>
          {imagesToggle
            ? imagesArr.length > 0 && (
                <li className="flex w-full mb-8 h-52 overflow-auto scrollbar-hidden scrollbar-hidden::-webkit-scrollbar">
                  <ul className="w-full list-none ">
                    {imagesArr.map((image) => {
                      return (
                        <li
                          className="flex w-full items-center font-semibold mb-4 "
                          key={uuidv4()}
                        >
                          <div className="w-10 h-10 mr-2">
                            <img
                              className="min-w-10 h-10 rounded-md object-cover "
                              src={`http://localhost:5000/uploads/files/${image}`}
                              alt=""
                            ></img>
                          </div>
                          <div className="text-xs w-40 truncate mr-2">
                            {image}
                          </div>
                          <button
                            className="w-6 h-6 rounded-full ml-auto  bg-white/10 flex justify-center items-center hover:border"
                            onClick={() => downloadFile(image)}
                          >
                            <img
                              className="w-6 "
                              src={downloadIcon}
                              alt=""
                            ></img>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              )
            : ""}

          <li className="flex w-full mb-8 font-semibold">
            <div>Shared Files</div>
            <button
              className="w-6 h-6 rounded-full ml-auto bg-white/10 flex items-center justify-center"
              onClick={() => {
                setFilesToggle((prev) => !prev);
              }}
            >
              <img
                className="w-3"
                src={filesToggle ? arrowDown : arrowUp}
                alt=""
              ></img>
            </button>
          </li>
          {filesToggle
            ? filesArr.length > 0 && (
                <li className="flex w-full mb-8 h-48 overflow-auto scrollbar-hidden scrollbar-hidden::-webkit-scrollbar">
                  <ul className="w-full list-none ">
                    {filesArr.map((file) => {
                      return (
                        <li
                          className="flex w-full items-center font-semibold mb-4 "
                          key={uuidv4()}
                        >
                          <div className="w-6 mr-2">
                            <img className="" src={fileImage} alt=""></img>
                          </div>
                          <div className="text-xs w-40 truncate mr-2">
                            {file}
                          </div>
                          <button
                            className="w-6 h-6 rounded-full ml-auto  bg-white/10 flex  items-center hover:border"
                            onClick={() => downloadFile(file)}
                          >
                            <img
                              className="w-6 "
                              src={downloadIcon}
                              alt=""
                            ></img>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              )
            : ""}
        </ul>
      </div>
    </div>
  );
}
