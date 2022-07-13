const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
  console.log("A user connected");
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});