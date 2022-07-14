const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 3000;

let readyPlayerCount = 0;

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("ready", () => {
    console.log("Player ready", socket.id);
  });

  readyPlayerCount++;
  if (readyPlayerCount === 2) {
    // broadcast('startGame)
    io.emit("startGame", socket.id);
  }

  socket.on("paddleMove", (paddleData) => {
    socket.broadcast.emit("paddleMove", paddleData);
  });

  socket.on("ballMove", (ballData) => {
    socket.broadcast.emit("ballMove", ballData);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
