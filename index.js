const express = require("express");
const { connection } = require("./config/db");
const app = express();
require("dotenv").config();
const { UserRouter } = require("./router/UserRouter");

app.get("/", (req, res) => {
  res.sendFile(__dirname, "/chat.html");
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
