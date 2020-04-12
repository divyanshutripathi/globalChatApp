const express = require("express");
const socketIo = require("socket.io");

const cred = require("./config/cred");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect(cred.database, { useNewUrlParser: true });

mongoose.connection.on("connect", () => {
  console.log("connected to the database");
});
mongoose.connection.on("error", (err) => {
  console.log("Error connecting Database");
});

const app = express();
const usersRouter = require("./routes/users");
app.use(
  express.json({
    extended: true,
  })
);
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use("/user", usersRouter);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log("server started on port : ", port);
});
const io = socketIo(server);

const chat = require("./routes/chat");

chat(app, io);
