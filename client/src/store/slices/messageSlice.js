import axios from "axios";
export const createMessageSlice = (set, get) => ({
  uploadedFiles: [],
  reply: undefined,
  isFile: false,
  isDownloading: false,
  audioRecording: undefined,
  isFullScreen: false,
  fullScreenParams: undefined,

  setUploadedFiles: (uploadedFiles) => set({ uploadedFiles }),
  setReply: (reply) => set({ reply }),
  setIsFile: (isFile) => set({ isFile }),
  setIsDownloading: (isDownloading) => set({ isDownloading }),
  setAudioRecording: (audioRecording) => set({ audioRecording }),

  setIsFullScreen: (isFullScreen) => set({ isFullScreen }),
  setFullScreenParams: (fullScreenParams) => set({ fullScreenParams }),
  removeFiles: (file) => {
    const uploadedFiles = get().uploadedFiles;
    set({
      uploadedFiles: [...uploadedFiles.filter((myFile) => myFile !== file)],
    });
  },
  downloadFile: async (url) => {
    // setIsDownloading(true);
    set({ isDownloading: true });
    try {
      const res = await axios.get(
        `http://localhost:5000/uploads/files/${url}`,
        { responseType: "blob" }
      );
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
          //   setIsDownloading(false);
          set({ isDownloading: false });
        }, 2000);
      }
    } catch (error) {
      console.log(error?.response?.data?.msg);
    }
  },
});
