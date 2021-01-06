const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const app = express();

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "localhost:3000",
    credentials: true,
  },
});

app.use(cors());

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    console.log("User connected");
    console.log(username, room);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(4000, () => {
  console.log("Server running");
});
