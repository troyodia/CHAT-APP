const Message = require("../models/Message");

const socketSetUp = (server) => {
  const { Server } = require("socket.io");
  const io = new Server(server, {
    cors: {
      credentials: true,
      // origin: "http://localhost:3000",
      origin: [
        // "https://auth.localhost",
        // "wss://auth.localhost",
        "https://auth.localhost:*",
        "http://localhost:3000",
      ],
      // origin: "*",
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
  const handleGoingOffline = (socket, data) => {
    console.log("going-offline", data);
    data.forEach((contact) => {
      if (socketMap.has(contact._id)) {
        const recipientId = socketMap.get(contact._id);
        console.log("in the map", contact._id);
        socket.to(recipientId).emit("contact-offline", true);
      }
    });
  };
  const handleComingOnline = (socket, data) => {
    console.log("coming online", data);
    data.forEach((contact) => {
      if (socketMap.has(contact._id)) {
        const recipientId = socketMap.get(contact._id);
        console.log("in the map", contact._id);
        socket.to(recipientId).emit("contact-online", true);
      }
    });
  };
  const sendMessage = async (message) => {
    const senderSocketId = socketMap.get(message.sender);
    const recipientSocketId = socketMap.get(message.recipient);

    const createMessage = await Message.create(message);

    if (recipientSocketId === undefined) {
      console.log("offline");
      await Message.updateOne(
        { _id: createMessage._id },
        { $set: { isUnread: true } }
      );
    }
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
  const handleUserBlockStatus = (socket, data) => {
    const recipientSocketId = socketMap.get(data.contact);
    if (recipientSocketId) {
      socket.to(recipientSocketId).emit("update-block-status", data.status);
    }
  };
  io.on("connection_error", (err) => {
    console.log(err.code); // 3
    console.log(err.message); // "Bad request"
    console.log(err.context); //
  });
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
    socket.on("going-offline", (data) => handleGoingOffline(socket, data));
    socket.on("coming-online", (data) => handleComingOnline(socket, data));

    socket.on("user-block-status", (data) =>
      handleUserBlockStatus(socket, data)
    );
    socket.on("disconnect", () => socketDisconnet(socket));
  });
};
module.exports = socketSetUp;
