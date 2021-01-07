const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const {
  rooms,
  addUserInRoom,
  deleteUserFromRoom,
  addNewMessageInRoom,
} = require("./socket/rooms.js");

const app = express();

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

app.use(cors());

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, roomname }) => {
    addUserInRoom(username, roomname);
    socket.join(roomname);
    const { users, messages } = rooms.get(roomname);

    io.sockets.to(roomname).emit("setUsers", { users });
    io.sockets.to(roomname).emit("setMessages", { messages });
  });

  socket.on("sendMessage", ({ message, roomname }) => {
    addNewMessageInRoom(message, roomname);

    const { messages } = rooms.get(roomname);
    io.sockets.to(roomname).emit("setMessages", { messages });
  });

  socket.on("userLogout", ({ username, roomname }) => {
    deleteUserFromRoom(username, roomname);
    const room = rooms.get(roomname);
    if (room) {
      io.sockets.to(roomname).emit("setUsers", { users: room.users });
    }
  });
});

server.listen(4000, () => {
  console.log("Server running");
});
