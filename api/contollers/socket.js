const Message = require("../models/Message");

const socketSetUp = (server) => {
  const { Server } = require("socket.io");
  const io = new Server(server, {
    cors: {
      credentials: true,
      origin: "http://localhost:3000",
    },
  });
  const socketMap = new Map();
  const socketDisconnet = (socket) => {
    console.log("Client disconnected from " + socket.id);
    for (const [userId, socketId] of socketMap.entries()) {
      if (socketId === socket.id) {
        socketMap.delete(userId);
        break;
      }
    }
  };
  const sendMessage = async (message) => {
    const senderSocketId = socketMap.get(message.sender);
    const recipientSocketId = socketMap.get(message.recipient);

    const createMessage = await Message.create(message);

    const messageData = await Message.findOne({ _id: createMessage._id })
      .populate("sender", "id email firstname lastname image")
      .populate("recipient", "id email firstname lastname image");
    console.log(recipientSocketId, senderSocketId);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("recieveMessage", messageData);
      console.log("sent");
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("recieveMessage", messageData);
      console.log("sent");
    }
  };
  const handleOutGoingVoiceCall = (socket, data) => {
    const recipientSocketId = socketMap.get(data.to);
    if (recipientSocketId) {
      socket.to(recipientSocketId).emit("incoming-voice-call", {
        from: data.from,
        roomId: data.roomId,
        callType: data.callType,
      });
      console.log("sent voice call");
    }
  };
  const handleOutGoingVideoCall = (socket, data) => {
    const recipientSocketId = socketMap.get(data.to);
    if (recipientSocketId) {
      socket.to(recipientSocketId).emit("incoming-video-call", {
        from: data.from,
        roomId: data.roomId,
        callType: data.callType,
      });
      console.log("sent video call");
    }
  };
  const handleAcceptCall = (socket, data) => {
    const recipientSocketId = socketMap.get(data.id);
    if (recipientSocketId) {
      socket.to(recipientSocketId).emit("accepted-call");
      console.log("accept call");
    }
  };
  const handleRejectVoiceCall = (socket, data) => {
    const recipientSocketId = socketMap.get(data.from);
    if (recipientSocketId) {
      socket.to(recipientSocketId).emit("rejected-voice-call");
      console.log("reject voice call");
    }
  };
  const handleRejectVideoCall = (socket, data) => {
    const recipientSocketId = socketMap.get(data.from);
    if (recipientSocketId) {
      socket.to(recipientSocketId).emit("rejected-video-call");
      console.log("reject video call");
    }
  };
  io.on("connection", (socket) => {
    console.log("socket on");
    const userId = socket.handshake.query.userId;
    if (userId) {
      socketMap.set(userId, socket.id);
      console.log("User " + userId + " connected to " + socket.id);
    } else {
      console.log("No user id provided during connection");
    }
    socket.on("sendMessage", sendMessage);

    socket.on("disconnect", () => socketDisconnet(socket));
    socket.on("outgoing-voice-call", (data) =>
      handleOutGoingVoiceCall(socket, data)
    );

    socket.on("outgoing-video-call", (data) =>
      handleOutGoingVideoCall(socket, data)
    );
    socket.on("accept-incoming-call", (data) => handleAcceptCall(socket, data));
    socket.on("reject-voice-call", (data) =>
      handleRejectVoiceCall(socket, data)
    );
    socket.on("reject-video-call", (data) =>
      handleRejectVideoCall(socket, data)
    );
  });
};
module.exports = socketSetUp;
