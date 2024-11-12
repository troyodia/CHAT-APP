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
  io.on("connection", (socket) => {
    console.log("socket on");
    const userId = socket.handshake.query.userId;
    if (userId) {
      socketMap.set(userId, socket.id);
      console.log("User " + userId + "connected to " + socket.id);
    } else {
      console.log("No user id provided during connection");
    }
    socket.on("disconnect", () => socketDisconnet(socket));
  });
};
module.exports = socketSetUp;
