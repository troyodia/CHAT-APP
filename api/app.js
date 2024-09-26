require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const app = express();
const authRouter = require("./routes/auth");
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.get("/home", (req, res) => {
  res.send("home");
});

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
