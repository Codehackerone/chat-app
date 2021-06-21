"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var user_controller_1 = require("../controllers/user.controller");
var auth_middleware_1 = require("../middlewares/auth.middleware");
var Router = express_1["default"].Router();
Router.route("/signin")
    .get(user_controller_1.renderSignin)
    .post(user_controller_1.signin);
Router.route("/userdetails")
    .get(user_controller_1.renderUserDetails);
Router.route("/profile").get(auth_middleware_1.authorize(), user_controller_1.profile);
Router.route("/signout").all(auth_middleware_1.authorize(), user_controller_1.signout);
exports["default"] = Router;
//# sourceMappingURL=users.route.js.map