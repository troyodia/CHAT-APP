require("dotenv").config();
require("express-async-errors");
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connect");
const app = express();
const authRouter = require("./routes/auth");
const userRouter = require("./routes/userInfo");
const notFoundErrorMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authorize = require("./middleware/authorize");
const upload = require("./middleware/multer");

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/uploads/profiles", express.static("uploads/profile"));
app.use(cookieParser());

app.use(upload.single("image"));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authorize, userRouter);
app.get("/home", (req, res) => {
  res.send("home");
});
app.use(notFoundErrorMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("listening on port " + port);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
