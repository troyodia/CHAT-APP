export const createChatSlice = (set, get) => ({
  activeItem: undefined,
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  directMessageContactList: [],
  uploadedFiles: [],
  reply: undefined,
  isFile: false,
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setDirectMessageContactList: (directMessageContactList) =>
    set({ directMessageContactList }),
  setSelectedChatMessages: (selectedChatMessages) =>
    set({ selectedChatMessages }),
  setActiveItem: (activeItem) => set({ activeItem }),
  setUploadedFiles: (uploadedFiles) => set({ uploadedFiles }),
  setReply: (reply) => set({ reply }),
  setIsFile: (isFile) => set({ isFile }),
  closeChat: () =>
    set({
      selectedChatType: undefined,
      selectedChatData: undefined,
      selectedChatMessages: [],
    }),
  addMessage: (message) => {
    const selectedChatMessages = get().selectedChatMessages;
    const selectedChatType = get().selectedChatType;
    set({
      selectedChatMessages: [
        ...selectedChatMessages,
        {
          ...message,
          recipient:
            selectedChatType === "channel"
              ? message.recipient
              : message.recipient._id,
          sender:
            selectedChatType === "channel"
              ? message.sender
              : message.sender._id,
        },
      ],
    });
  },
  removeFiles: (file) => {
    const uploadedFiles = get().uploadedFiles;
    set({
      uploadedFiles: [...uploadedFiles.filter((myFile) => myFile !== file)],
    });
  },
});
