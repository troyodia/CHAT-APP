const Message = require("../models/Message");

const socketSetUp = (server) => {
  const { Server } = require("socket.io");
  const io = new Server(server, {
    cors: {
      credentials: true,
      origin: [
        "https://auth.localhost",
        "http://localhost:3000",
        "https://rasengan.vip",
      ],
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
    data.forEach((contact) => {
      if (socketMap.has(contact._id)) {
        const recipientId = socketMap.get(contact._id);
        socket.to(recipientId).emit("contact-offline", true);
      }
    });
  };
  const handleComingOnline = (socket, data) => {
    data.forEach((contact) => {
      if (socketMap.has(contact._id)) {
        const recipientId = socketMap.get(contact._id);
        socket.to(recipientId).emit("contact-online", true);
      }
    });
  };
  const sendMessage = async (message) => {
    const senderSocketId = socketMap.get(message.sender);
    const recipientSocketId = socketMap.get(message.recipient);

    const createMessage = await Message.create(message);

    if (recipientSocketId === undefined) {
      await Message.updateOne(
        { _id: createMessage._id },
        { $set: { isUnread: true } }
      );
    }
    const messageData = await Message.findOne({ _id: createMessage._id })
      .populate("sender", "id email firstname lastname image")
      .populate("recipient", "id email firstname lastname image");
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("recieveMessage", messageData);
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("recieveMessage", messageData);
    }
  };

  const handleUserBlockStatus = (socket, data) => {
    const recipientSocketId = socketMap.get(data.contact);
    if (recipientSocketId) {
      socket.to(recipientSocketId).emit("update-block-status", data.status);
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
    socket.on("going-offline", (data) => handleGoingOffline(socket, data));
    socket.on("coming-online", (data) => handleComingOnline(socket, data));

    socket.on("user-block-status", (data) =>
      handleUserBlockStatus(socket, data)
    );
    socket.on("disconnect", () => socketDisconnet(socket));
  });
};
module.exports = socketSetUp;
