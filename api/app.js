require("dotenv").config();
require("express-async-errors");
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connect");
const app = express();
const http = require("http");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/userInfo");
const contactRouter = require("./routes/contacts");
const contactListRouter = require("./routes/contactList");
const messageRouter = require("./routes/messages");
const notFoundErrorMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authorize = require("./middleware/authorize");
const socketSetUp = require("./contollers/socket");

app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.APP_ORIGIN }));

app.use(
  "/uploads/profiles",
  express.static(path.join(__dirname, "uploads/profiles"))
);
app.use(
  "/uploads/files",
  express.static(path.join(__dirname, "uploads/files"))
);
app.use(
  "/uploads/audioFiles",
  express.static(path.join(__dirname, "uploads/audioFiles"))
);
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authorize, userRouter);
app.use("/api/v1/contact", authorize, contactRouter);
app.use("/api/v1/contactList", authorize, contactListRouter);
app.use("/api/v1/messages", authorize, messageRouter);

app.get("/home", (req, res) => {
  res.send("home");
});
app.use(notFoundErrorMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const server = app.listen(port, () => {
      console.log(
        "listening on port " + port + ` in ${process.env.NODE_ENV} environment`
      );
    });
    socketSetUp(server);
  } catch (error) {
    console.log(error);
  }
};
start();
