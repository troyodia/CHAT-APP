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
  });
};
module.exports = socketSetUp;
