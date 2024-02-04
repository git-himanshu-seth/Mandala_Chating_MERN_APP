const express = require("express");
const { createServer } = require("http");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const appRoute = require("./routes/routes");
const cors = require("cors");

dotenv.config({ path: "./.env" });

const app = express();

const URI = process.env.MONGOBD_CONNECTION_STRING;

mongoose.connect(URI, {
  directConnection: true,
});

mongoose.connection.on("connected", function () {
  console.log(
    `Database connection open to ${mongoose.connection.host} ${mongoose.connection.name}`
  );
});

mongoose.connection.on("error", function (err) {
  console.log("Mongoose default connection error: " + err);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
});

const httpServer = createServer();
const io = new socketIO.Server(httpServer, {
  cors: {
    origin: ["http://localhost:3001"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  socket.on("sendMessage", ({ content, sender, timestamp, groupId }) => {
    socket
      .to(groupId)
      .emit("reciveMessage", { content, sender, timestamp, groupId });
  });
  socket.on("sendOneToOneMessage", ({ content, sender, timestamp, chatId }) => {
    socket
      .to(chatId)
      .emit("reciveOneToOneMessage", { content, sender, timestamp, chatId });
  });

  socket.on("disconnect", (reason) => {});
  socket.on("connect", (reason) => {});
});

io.listen(8080);

app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/mandala", appRoute);
app.listen(3000, () => {
  console.log("Connect ", process.env.PORT);
});
