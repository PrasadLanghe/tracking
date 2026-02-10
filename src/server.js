import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

/* DB Connection */
connectDB();

/* Create HTTP server */
const server = http.createServer(app);

/* Socket.IO setup */
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

/* Socket logic */
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("joinTracking", (trackingId) => {
    socket.join(trackingId);
    console.log(`Joined room: ${trackingId}`);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

/* Make io global */
app.set("io", io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
