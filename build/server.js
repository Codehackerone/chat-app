"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var dotenv_1 = require("dotenv");
var app = express_1["default"]();
dotenv_1.config();
var port = Number(process.env.PORT);
app.listen(port, function () {
    console.log("Chat-app running on port " + port + ".");
});
//# sourceMappingURL=server.js.map