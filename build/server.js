"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
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
var chat_service_1 = require("./services/chat.service");
var users_route_1 = __importDefault(require("./routes/users.route"));
var chat_route_1 = __importDefault(require("./routes/chat.route"));
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
        sameSite: true
    }
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
    useFindAndModify: false
};
mongoose_1["default"]
    .connect(uri, connectOptions)
    .then()["catch"](function (err) { return console.log("Error:" + err); });
mongoose_1["default"].connection.once("open", function () {
    return console.log("Connected to MongoDB successfully.");
});
io.on("connection", function (socket) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        socket.on("joinRoom", function (jwtToken) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, user, room, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, chat_service_1.verifyToken(jwtToken)];
                    case 1:
                        _a = _b.sent(), user = _a.user, room = _a.room;
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _b.sent();
                        socket.emit("error", err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
app.use("/users", users_route_1["default"]);
app.use("/chat", chat_route_1["default"]);
app.all("*", function (req, res) {
    res.send("Sorry! Route not found");
});
var port = Number(process.env.PORT);
server.listen(port, function () {
    console.log("Chatversity running on port " + port + ".");
});
//# sourceMappingURL=server.js.map