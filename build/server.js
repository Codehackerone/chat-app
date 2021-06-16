"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var dotenv_1 = require("dotenv");
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = require("socket.io");
var messages_1 = require("./utils/messages");
var users_1 = require("./utils/users");
var users_route_1 = __importDefault(require("./routes/users.route"));
dotenv_1.config();
var app = express_1["default"]();
var server = http_1["default"].createServer(app);
var io = new socket_io_1.Server(server);
var botName = "Chatversity Bot";
app.use(cors_1["default"]());
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use(express_1["default"].static(path_1["default"].join(__dirname, "public")));
app.use(express_1["default"].static(__dirname + "/views"));
app.set("view engine", "ejs");
io.on("connection", function (socket) {
    socket.on("joinRoom", function (_a) {
        var username = _a.username, room = _a.room;
        var user = users_1.userJoin(socket.id, username, room);
        socket.join(user.room);
        socket.emit("message", messages_1.formatMessage(botName, "Welcome to Chatversity!"));
        socket.broadcast
            .to(user.room)
            .emit("message", messages_1.formatMessage(botName, user.username + " has joined the chat"));
        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: users_1.getRoomUsers(user.room)
        });
    });
    socket.on("chatMessage", function (msg) {
        var user = users_1.getCurrentUser(socket.id);
        io.to(user.room).emit("message", messages_1.formatMessage(user.username, msg));
    });
    socket.on("disconnect", function () {
        var user = users_1.userLeave(socket.id);
        if (user) {
            io.to(user.room).emit("message", messages_1.formatMessage(botName, user.username + " has left the chat"));
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: users_1.getRoomUsers(user.room)
            });
        }
    });
});
// app.get("/", (req: any, res: any) => {
//   res.render("index");
// });
// app.get("/chat", (req: any, res: any) => {
//   var { username, room } = req.query;
//   res.render("chat", { username, room });
// });
app.use('/users', users_route_1["default"]);
app.all('*', function (req, res) {
    res.send('Sorry! Route not found');
});
var port = Number(process.env.PORT);
server.listen(port, function () {
    console.log("Chat-app running on port " + port + ".");
});
//# sourceMappingURL=server.js.map