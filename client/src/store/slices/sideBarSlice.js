export const createSideBarSlice = (set, get) => ({
  activeItem: undefined,
  displayDirectMessageModal: false,
  displayChannelModal: false,
  directMessageContactList: [],
  dmSearch: "",
  dmListSearchResultsArr: [],
  messageNotification: new Map(),

  setActiveItem: (activeItem) => set({ activeItem }),
  setDirectMessageContactList: (directMessageContactList) =>
    set({ directMessageContactList }),
  setDisplayDirectMessageModal: () =>
    set((state) => ({
      displayDirectMessageModal: !state.displayDirectMessageModal,
    })),
  setDisplayChannelModal: () =>
    set((state) => ({
      displayChannelModal: !state.displayChannelModal,
    })),
  setDMSearch: (dmSearch) => set({ dmSearch }),
  setDMListSearchResultsArr: (dmListSearchResultsArr) =>
    set({ dmListSearchResultsArr }),
});
