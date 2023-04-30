import express from 'express';
import dotenv from 'dotenv';
import auth from './router/auth.js';
import chatRoutes from './router/chatRoutes.js';
import messageRoutes from './router/sendMessageRoutes.js';

const app = express();

dotenv.config();
app.use(express.json());

app.use(auth);
app.use(chatRoutes);
app.use('/message', messageRoutes);

app.get('/', (req, res) => {
  res.send("Hello World")
})

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
})

import { Server } from "socket.io";
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://charchaa.in",
  },
});


io.on("connection", (socket) => {
  console.log('Connected to socket.io');

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
  socket.off("setup", () => {
    console.log('User Disconnected');
    socket.leave(userData._id);
  });
})