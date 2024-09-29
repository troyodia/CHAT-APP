require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const app = express();
const authRouter = require("./routes/auth");
const userRouter = require("./routes/userInfo");
const notFoundErrorMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authorize = require("./middleware/authorize");

app.use(express.json());
app.use(cors());

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
