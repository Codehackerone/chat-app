"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var auth_middleware_1 = require("../middlewares/auth.middleware");
var chat_controller_1 = require("../controllers/chat.controller");
var roomchecker_middleware_1 = require("../middlewares/roomchecker.middleware");
var Router = express_1["default"].Router();
Router.route("/").get(auth_middleware_1.authorize(), chat_controller_1.renderIndex);
Router.route("/terminal").get(auth_middleware_1.authorize(), chat_controller_1.renderTerminal);
Router.route("/chat").post(auth_middleware_1.authorize(), roomchecker_middleware_1.createOrFetchRoom(), roomchecker_middleware_1.roomChecker(), chat_controller_1.roomHandler);
exports["default"] = Router;
//# sourceMappingURL=chat.route.js.map