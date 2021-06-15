import express from "express";
import { config } from "dotenv";
import path from "path";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";


config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname + "/views"));
app.set("view engine", "ejs");

io.on("connection", (socket) => {
  socket.emit('message','Welcome to chatversity!');
  socket.broadcast.emit('message','A user has joined the chat');

  socket.on('disconnect',()=>{
    io.emit('message','A user has left the chat');
  })
});

app.get("/", (req: any, res: any) => {
  res.render("index");
});

app.get("/chat", (req: any, res: any) => {
  var { username, room } = req.query; 
  res.render("chat", { username, room });
});

const port = Number(process.env.PORT);
server.listen(port, () => {
  console.log(`Chat-app running on port ${port}.`);
});
