import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import session from "express-session";
import flash from "express-flash";
import { formatMessage } from "./utils/messages";
import {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} from "./utils/users";
import { verifyToken } from "./services/chat.service";
import userRouter from "./routes/users.route";
import chatRouter from "./routes/chat.route";

config();
const secret = process.env.SESSION_SECRET;
const sessionConfig = {
  name: "session",
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: true,
  },
};
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const botName = "Chatversity Bot";

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(flash());
app.use("/css", express.static("public/css"));
app.use("/build", express.static("public/build"));
app.use("/js", express.static("public/js"));
app.use("/img", express.static("public/images"));

app.set("view engine", "ejs");

const uri = String(process.env.MONGO_URI);
const connectOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose
  .connect(uri, connectOptions)
  .then()
  .catch((err) => console.log("Error:" + err));

mongoose.connection.once("open", () =>
  console.log("Connected to MongoDB successfully.")
);

io.on("connection", (socket) => {
  socket.on("joinRoom", (jwtToken) => {
    let username="",room="";
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    socket.emit("message", formatMessage(botName, "Welcome to Chatversity!"));

    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // io.to(user.room).emit("roomUsers", {
    //   room: user.room,
    //   users: getRoomUsers(user.room),
    // });
  });

  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // socket.on("disconnect", () => {
  //   const user: any = userLeave(socket.id);

  //   if (user) {
  //     io.to(user.room).emit(
  //       "message",
  //       formatMessage(botName, `${user.username} has left the chat`)
  //     );

  //     io.to(user.room).emit("roomUsers", {
  //       room: user.room,
  //       users: getRoomUsers(user.room),
  //     });
  //   }
  // });
});

app.use("/users", userRouter);

app.use("/chat", chatRouter);

app.all("*", (req, res) => {
  res.send("Sorry! Route not found");
});

const port = Number(process.env.PORT);
server.listen(port, () => {
  console.log(`Chatversity running on port ${port}.`);
});
