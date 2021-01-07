const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const { rooms, addUserInRoom, deleteUserFromRoom } = require("./socket/user.js");

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
  socket.on("joinRoom", ({ username, room }) => {
    console.log("User join room");
    addUserInRoom(username, room);
    console.log(rooms);
  });

  socket.on("disconnect", () => {});

  socket.on("userLogout", ({ username, room }) => {
    console.log("LOGOUT");
    deleteUserFromRoom(username, room);
    console.log(rooms);
  });
});

server.listen(4000, () => {
  console.log("Server running");
});
