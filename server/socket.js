// const { createServer } = require("http");
// const socketIO = require("socket.io");

// const httpServer = createServer();
// const io = new socketIO.Server(httpServer, {
//   cors: {
//     origin: ["http://localhost:3001"],
//     allowedHeaders: ["my-custom-header"],
//     credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   // send message with senderId, receiverId, chatId:_id

//   socket.on("sendMessage", ({ senderId, receiverId, socketId }) => {
//     console.log(senderId, receiverId, socketId);
//     io.to(socketId).emit("getMessage", {
//       senderId,
//       text: "hello",
//     });
//   });
//   // socket.current.on("getMessage", (data) => {});
//   // get message from socket receiverId, chatId:_id
//   socket.on("sendMessage", (req) => {});

//   // disconnected socket
//   socket.on("disconnect", (reason) => {
//     console.log(reason); // "ping timeout"
//   });
//   // connection started
//   socket.on("connect", (reason) => {
//     console.log(reason); // "ping timeout"
//   });
// });

// io.listen(8080);
