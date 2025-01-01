export const createChatSlice = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  toggleSettings: false,
  isOnline: false,
  disableMessageBar: false,
  blockedContacts: [],
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatMessages: (selectedChatMessages) =>
    set({ selectedChatMessages }),

  setToggleSettings: () =>
    set((state) => ({ toggleSettings: !state.toggleSettings })),
  setIsOnline: (isOnline) => set({ isOnline }),
  setDisabledMessageBar: () =>
    set((state) => ({ disableMessageBar: !state.disableMessageBar })),
  setBlockedContacts: (blockedContacts) => set({ blockedContacts }),
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
});
