"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var user_controller_1 = require("../controllers/user.controller");
var Router = express_1["default"].Router();
Router.route('/signin')
    .get(user_controller_1.signin);
exports["default"] = Router;
//# sourceMappingURL=users.route.js.map