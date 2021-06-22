"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var Router = express_1["default"].Router();
Router.route("/")
    .get();
Router.route("/chat")
    .get();
exports["default"] = Router;
//# sourceMappingURL=chat.route.js.map