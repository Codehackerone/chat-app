import express from "express";
import { config } from "dotenv";
import path from "path";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

config();
const app = express();
const server=http.createServer(app);
const io=new Server(server);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + "/views"));
app.set("view engine", "ejs");


io.on('connection',socket=>{
    console.log("User connected");  
})

app.get('/',(req:any,res:any)=>{
    res.render('index')
})

const port = Number(process.env.PORT);
server.listen(port, () => {
  console.log(`Chat-app running on port ${port}.`);
});
