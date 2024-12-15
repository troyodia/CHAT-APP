export const createSideBarSlice = (set, get) => ({
  activeItem: undefined,
  displayDirectMessageModal: false,
  displayChannelModal: false,

  setActiveItem: (activeItem) => set({ activeItem }),
  setDisplayDirectMessageModal: () =>
    set((state) => ({
      displayDirectMessageModal: !state.displayDirectMessageModal,
    })),
  setDisplayChannelModal: () =>
    set((state) => ({
      displayChannelModal: !state.displayChannelModal,
    })),
});
