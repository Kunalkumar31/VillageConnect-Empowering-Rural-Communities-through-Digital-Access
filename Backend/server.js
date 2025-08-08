const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const forumRoutes = require("./routes/forumRoutes");
require("dotenv").config();

connectDB();

const cors = require("cors");
app.use(cors());

const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // ✅ match frontend
    methods: ["GET", "POST"],
    credentials: true
  }
});

require("./sockets/chat")(io);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/forum", forumRoutes);

server.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);