const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors"); // Import the cors middleware

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
// io.set("origins", "http://localhost:3002/");
// Use cors middleware
io.origins(["http://localhost:3001/"]);
app.use(cors({ origin: "*" }));
// app.use(cors(corsOptions));

io.on("connection", (socket) => {
  console.log("User connected");

  // Handle chat events
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
  const address = server.address();
  console.log(`Server running at http://${address.address}:${address.port}/`);
});
