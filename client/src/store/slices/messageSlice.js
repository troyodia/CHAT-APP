import axios from "axios";
import { DELETE_MESSAGE_FILE_URL, GET_SIGNED_URL } from "../../utils/URLS";
import axiosInstance from "../../utils/axiosInstance";
export const createMessageSlice = (set, get) => ({
  uploadedFiles: [],
  reply: undefined,
  isFile: false,
  isDownloading: false,
  audioRecording: undefined,
  isFullScreen: false,
  fullScreenParams: undefined,
  audioRecordingMap: new Map(),
  uploadedFilesMap: new Map(),
  replyMap: new Map(),
  unreadMessages: [],
  lastMessageMap: new Map(),
  firstUnreadMessage: new Map(),
  scrollHighlight: new Map(),
  messageMap: new Map(),
  setUploadedFiles: (uploadedFiles) => set({ uploadedFiles }),
  setReply: (reply) => set({ reply }),
  setIsFile: (isFile) => set({ isFile }),
  setIsDownloading: (isDownloading) => set({ isDownloading }),
  setAudioRecording: (audioRecording) => set({ audioRecording }),

  setIsFullScreen: (isFullScreen) => set({ isFullScreen }),
  setFullScreenParams: (fullScreenParams) => set({ fullScreenParams }),
  setUnreadMessages: (unreadMessages) =>
    set((state) => ({
      unreadMessages: [...unreadMessages],
    })),

  removeFiles: async (file, key) => {
    const uploadedFilesMap = get().uploadedFilesMap;
    try {
      const res = await axiosInstance.post(
        DELETE_MESSAGE_FILE_URL,
        { filename: file },
        { withCredentials: true }
      );
      if (res.status === 200 && res.data) {
        console.log(res.data);
        set({
          uploadedFilesMap: new Map(uploadedFilesMap).set(key, [
            ...uploadedFilesMap.get(key).filter((myFile) => myFile !== file),
          ]),
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  downloadFile: async (url) => {
    set({ isDownloading: true });
    try {
      const result = await axiosInstance.post(
        GET_SIGNED_URL,
        { filename: url },
        { withCredentials: true }
      );
      if (result.status === 200 && result.data) {
        console.log(result.data.url);
        const res = await axios.get(result.data.url, { responseType: "blob" });
        if (res.data && res.status === 200) {
          const urlBlob = new Blob([res.data]);
          const tempURL = window.URL.createObjectURL(urlBlob);

          const tempLink = document.createElement("a");
          tempLink.href = tempURL;
          tempLink.setAttribute("download", url);
          document.body.appendChild(tempLink);
          tempLink.click();

          document.body.removeChild(tempLink);
          window.URL.revokeObjectURL(tempURL);
          setTimeout(() => {
            set({ isDownloading: false });
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error?.response?.data?.msg);
    }
  },
});
