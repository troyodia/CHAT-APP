import { create } from "zustand";
import { createChatSlice } from "./slices/chatSlice";
import { createAuthSlice } from "./slices/authSlice";
import { createMessageSlice } from "./slices/messageSlice";
import { createSideBarSlice } from "./slices/sideBarSlice";
import { createCallSlice } from "./slices/callSlice";
import { persist } from "zustand/middleware";

export const useAppStore = create((...a) => ({
  ...createChatSlice(...a),
  ...createAuthSlice(...a),
  ...createMessageSlice(...a),
  ...createSideBarSlice(...a),
  ...createCallSlice(...a),
}));
