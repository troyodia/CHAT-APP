import { create } from "zustand";
import { createChatSlice } from "./slices/chatSlice";
import { createAuthSlice } from "./slices/authSlice";
export const useAppStore = create((...a) => ({
  ...createChatSlice(...a),
  ...createAuthSlice(...a),
}));
