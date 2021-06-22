"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var dotenv_1 = require("dotenv");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = require("socket.io");
var mongoose_1 = __importDefault(require("mongoose"));
var express_session_1 = __importDefault(require("express-session"));
var express_flash_1 = __importDefault(require("express-flash"));
var messages_1 = require("./utils/messages");
var users_1 = require("./utils/users");
var users_route_1 = __importDefault(require("./routes/users.route"));
dotenv_1.config();
var secret = process.env.SESSION_SECRET;
var sessionConfig = {
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
var app = express_1["default"]();
var server = http_1["default"].createServer(app);
var io = new socket_io_1.Server(server);
var botName = "Chatversity Bot";
app.use(cors_1["default"]());
app.use(cookie_parser_1["default"]());
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use(express_session_1["default"](sessionConfig));
app.use(express_flash_1["default"]());
app.use("/css", express_1["default"].static("public/css"));
app.use("/build", express_1["default"].static("public/build"));
app.use("/js", express_1["default"].static("public/js"));
app.use("/img", express_1["default"].static("public/images"));
app.set("view engine", "ejs");
var uri = String(process.env.MONGO_URI);
var connectOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
mongoose_1["default"]
  .connect(uri, connectOptions)
  .then()
  ["catch"](function (err) {
    return console.log("Error:" + err);
  });
mongoose_1["default"].connection.once("open", function () {
  return console.log("Connected to MongoDB successfully.");
});
io.on("connection", function (socket) {
  socket.on("joinRoom", function (_a) {
    var username = _a.username,
      room = _a.room;
    var user = users_1.userJoin(socket.id, username, room);
    socket.join(user.room);
    socket.emit(
      "message",
      messages_1.formatMessage(botName, "Welcome to Chatversity!")
    );
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        messages_1.formatMessage(
          botName,
          user.username + " has joined the chat"
        )
      );
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: users_1.getRoomUsers(user.room),
    });
  });
  socket.on("chatMessage", function (msg) {
    var user = users_1.getCurrentUser(socket.id);
    io.to(user.room).emit(
      "message",
      messages_1.formatMessage(user.username, msg)
    );
  });
  socket.on("disconnect", function () {
    var user = users_1.userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        messages_1.formatMessage(botName, user.username + " has left the chat")
      );
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: users_1.getRoomUsers(user.room),
      });
    }
  });
});
app.get("/", function (req, res) {
  res.render("index");
});
app.get("/chat", function (req, res) {
  var _a = req.query,
    username = _a.username,
    room = _a.room;
  res.render("chat", { username: username, room: room });
});
app.use("/users", users_route_1["default"]);
app.all("*", function (req, res) {
  res.send("Sorry! Route not found");
});
var port = Number(process.env.PORT);
server.listen(port, function () {
  console.log("Chatversity running on port " + port + ".");
});
//# sourceMappingURL=server.js.map
