import { create } from "zustand";
import { createChatSlice } from "./slices/chatSlice";
import { createAuthSlice } from "./slices/authSlice";
import { createMessageSlice } from "./slices/messageSlice";
import { createSideBarSlice } from "./slices/sideBarSlice";
export const useAppStore = create((...a) => ({
  ...createChatSlice(...a),
  ...createAuthSlice(...a),
  ...createMessageSlice(...a),
  ...createSideBarSlice(...a),
}));
