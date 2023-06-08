const express = require("express");
const { connection } = require("./config/db");
const app = express();
require("dotenv").config();
const { UserRouter } = require("./router/UserRouter");
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname, "/chat.html");
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  io.emit("message", (message) => {
    console.log(message);
  });
});

io.on("error", (err) => {
  console.log(err);
});

app.use(express.json());
app.use("/", UserRouter);

let port = process.env.PORT;
app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected TO DB");
    console.log(`App is running on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});
