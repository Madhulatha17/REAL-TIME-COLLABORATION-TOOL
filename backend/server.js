require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const app = express();

app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

require("./socket/whiteboardSocket")(io);

app.get("/", (req, res) => {
  res.send("Whiteboard Server Running");
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
