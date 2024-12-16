export const createCallSlice = (set, get) => ({
  incomingVoiceCall: undefined,
  incomingVideoCall: undefined,
  voiceCall: undefined,
  videoCall: undefined,

  setIncomingVoiceCall: (incomingVoiceCall) => set({ incomingVoiceCall }),
  setIncomingVideoCall: (incomingVideoCall) => set({ incomingVideoCall }),
  setVoiceCall: (voiceCall) => set({ voiceCall }),
  setVideoCall: (videoCall) => set({ videoCall }),

  endCall: () =>
    set({
      incomingVoiceCall: undefined,
      incomingVideoCall: undefined,
      voiceCall: undefined,
      videoCall: undefined,
    }),
});
