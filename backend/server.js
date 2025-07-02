//import express from "express"
//import dotenv from "dotenv"
//import { Server } from "socket.io"; // ✅
//import connectDB from "./database/db.js"
//import userRoute from "./routes/user.route.js"
//import blogRoute from "./routes/blog.route.js"
//import commentRoute from "./routes/comment.route.js"
//import ContactMessage from "./models/ContactMessage.js";
//import cookieParser from 'cookie-parser';
//import cors from 'cors'
//import path from "path"
//
//dotenv.config()
//const app = express()
//
//const PORT = process.env.PORT || 3000
//
//
//// default middleware
//app.use(express.json({ limit: "20mb" }));
//app.use(express.urlencoded({ extended: true, limit: "20mb" }));
//app.use(cookieParser());
////app.use(express.json());
////app.use(express.urlencoded({extended:true}));
//app.use(cors({
//    
//    origin: "http://localhost:5173",
//    credentials:true
//}))
//
//const _dirname = path.resolve()
//
//// apis
// app.use("/api/v1/user", userRoute)
// app.use("/api/v1/blog", blogRoute)
// app.use("/api/v1/comment", commentRoute)
//
//
//app.post("/api/v1/contact", async (req, res) => {
//  try {
//    const { name, email, subject, message } = req.body;
//    const newMsg = new ContactMessage({ name, email, subject, message });
//    await newMsg.save();
//    res.status(201).json({ message: "Message stored successfully" });
//  } catch (err) {
//    console.error(err);
//    res.status(500).json({ message: "Failed to store message" });
//  }
//});
//
//
// app.use(express.static(path.join(_dirname,"/frontend/dist")));
//
//app.listen(PORT, ()=>{
//    console.log(`Server listen at port ${PORT}`);
//    connectDB()
//})

// server.js or index.js
import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import commentRoute from "./routes/comment.route.js";
import ContactMessage from "./models/ContactMessage.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// ✅ Express App Setup
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const _dirname = path.resolve()

// ✅ HTTP Server + Socket.IO Init
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ✅ Real-Time Online User Tracking
let onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("user-joined", (userId) => {
    onlineUsers.set(userId, socket.id);
    io.emit("online-users", onlineUsers.size);
  });

  socket.on("user-left", (userId) => {
    onlineUsers.delete(userId);
    io.emit("online-users", onlineUsers.size);
  });

  socket.on("disconnect", () => {
    // Optional: Clean up any disconnected users
    for (let [userId, socketId] of onlineUsers) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    io.emit("online-users", onlineUsers.size);
    console.log("🔴 Client disconnected:", socket.id);
  });
});

// ✅ Middleware
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment", commentRoute);

// ✅ Contact Form Route
app.post("/api/v1/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newMsg = new ContactMessage({ name, email, subject, message });
    await newMsg.save();
    res.status(201).json({ message: "Message stored successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to store message" });
  }
});

// ✅ Serve Frontend (Vite Build Output) — Enable in Production
// Uncomment these lines when deploying

app.use(express.static(path.join(_dirname,"/frontend/dist")));
// ✅ Start Server
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  connectDB();
});
