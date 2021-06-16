import express from "express";
import { config } from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { formatMessage } from "./utils/messages";
import {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} from "./utils/users";
import userRouter from "./routes/users.route";

config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const botName = "Chatversity Bot";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/css", express.static("public/css"));
app.use("/js", express.static("public/js"));
app.use("/img", express.static("public/images"));

app.set("view engine", "ejs");

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    socket.emit("message", formatMessage(botName, "Welcome to Chatversity!"));

    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  socket.on("disconnect", () => {
    const user: any = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

app.get("/", (req: any, res: any) => {
  res.render("index");
});

app.get("/chat", (req: any, res: any) => {
  var { username, room } = req.query;
  res.render("chat", { username, room });
});

app.use("/users", userRouter);

app.all("*", (req, res) => {
  res.send("Sorry! Route not found");
});

const port = Number(process.env.PORT);
server.listen(port, () => {
  console.log(`Chat-app running on port ${port}.`);
});
