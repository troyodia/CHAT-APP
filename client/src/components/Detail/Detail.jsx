import arrowUp from "../../images/icons/uparrow.png";
import arrowDown from "../../images/icons/downarrow.png";
import downloadIcon from "../../images/icons/download.png";
import fileImage from "../../images/icons/myfile.png";
import rasengan from "../../images/icons/newrasengan.png";
import cancel from "../../images/icons/cancelround.png";

import { useCallback, useEffect, useState } from "react";
import { useAppStore } from "../../store";
import { shallow, useShallow } from "zustand/shallow";
import axiosInstance from "../../utils/axiosInstance";
import { isImage } from "../../utils/isImage";
import { v4 as uuidv4 } from "uuid";
import { useMediaQuery } from "react-responsive";
import { GET_CHAT_MESSAGES, AWS_BASE_FILE_PATH } from "../../utils/URLS";
export default function Detail() {
  const [imagesToggle, setImagesToggle] = useState(false);
  const [filesToggle, setFilesToggle] = useState(false);

  const [filesArr, setFilesArr] = useState([]);
  const [imagesArr, setImagesArr] = useState([]);
  const hideDetailScreenSize = useMediaQuery({ maxWidth: 810 });
  const toggleSettings = useAppStore((state) => state.toggleSettings, shallow);
  const setToggleSettings = useAppStore(
    (state) => state.setToggleSettings,
    shallow
  );
  const downloadFile = useAppStore((state) => state.downloadFile, shallow);
  const isDownloading = useAppStore((state) => state.isDownloading, shallow);
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
  const { selectedChatData, setSelectedChatMessages } = useAppStore(
    useShallow((state) => ({
      selectedChatData: state.selectedChatData,
      setSelectedChatMessages: state.setSelectedChatMessages,
    }))
  );
  useEffect(() => {
    const controller = new AbortController();
    const selectedChatData = useAppStore.getState().selectedChatData;
    const getChatFiles = async () => {
      try {
        const res = await axiosInstance.post(
          GET_CHAT_MESSAGES,
          { contactId: selectedChatData.id },
          { withCredentials: true, signal: controller.signal }
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
      setFilesToggle(false);
      setImagesToggle(false);
    }
    return () => {
      controller.abort();
    };
  }, [handleSetFileArray, selectedChatData, setSelectedChatMessages]);

  return (
    <div
      className={` relative flex flex-col items-center border border-y-0 border-r-0 border-l-white/30 ml-auto ${
        hideDetailScreenSize ? "w-full" : "w-[250px]"
      }`}
    >
      <div
        className={`${hideDetailScreenSize ? "w-32 h-32" : "w-24 h-24"} my-4`}
      >
        <img
          className={`${
            hideDetailScreenSize ? "w-32 h-32" : "w-24 h-24"
          } rounded-full object-cover`}
          src={`${AWS_BASE_FILE_PATH}/profiles/${selectedChatData?.image}`}
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
                <li className="flex w-full mb-2 max-h-36 overflow-auto scrollbar-hidden scrollbar-hidden::-webkit-scrollbar">
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
                              src={`${AWS_BASE_FILE_PATH}/messagefiles/${image}`}
                              alt=""
                            ></img>
                          </div>
                          <div className=" flex shrink text-xs truncate mr-2">
                            {image}
                          </div>
                          <button
                            className="w-6 h-6 rounded-full ml-auto  bg-white/10 flex shrink-0 justify-center items-center hover:border"
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

          <li className="flex w-full mb-4 font-semibold">
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
                <li className="flex w-full mb-8 max-h-36  overflow-auto scrollbar-hidden scrollbar-hidden::-webkit-scrollbar">
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
                          <div className="text-xs flex shrink truncate mr-2">
                            {file}
                          </div>
                          <button
                            className="w-6 h-6 rounded-full ml-auto  bg-white/10 flex shrink-0 items-center hover:border"
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
      {hideDetailScreenSize && toggleSettings && (
        <button
          className="absolute top-6 right-6 w-10"
          onClick={() => {
            setToggleSettings(false);
          }}
        >
          <img className="w-full" src={cancel} alt=""></img>
        </button>
      )}
      {isDownloading && (
        <div className="fixed flex justify-center items-center bottom-8 left-1/2 -translate-x-1/2  z-[3000] rounded-full px-5 py-3 bg-black">
          <img className="rounded-lg w-8" src={rasengan} alt=""></img>
          <div className="ml-4 text-lg text-white">Downloading...</div>
        </div>
      )}
    </div>
  );
}
