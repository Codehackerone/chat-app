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
exports.__esModule = true;
exports.userDetails = exports.signout = exports.profile = exports.signin = exports.renderUserDetails = exports.renderSignin = void 0;
var verifyUser_1 = require("../helpers/verifyUser");
var user_service_1 = require("../services/user.service");
var options = {
    path: "/",
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true
};
var renderSignin = function (req, res) {
    res.render("users/signin");
};
exports.renderSignin = renderSignin;
var renderUserDetails = function (req, res) {
    res.render("users/userdetails");
};
exports.renderUserDetails = renderUserDetails;
var signin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, user, gUser, new_gUser, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.body.token;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, verifyUser_1.verify(token)];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, user_service_1.checkGoogleUser(user._id)];
            case 3:
                gUser = _a.sent();
                res.cookie("x-session-token", token, options);
                if (!!gUser) return [3 /*break*/, 5];
                return [4 /*yield*/, user_service_1.addGoogleUser(user)];
            case 4:
                new_gUser = _a.sent();
                res.json({
                    type: "success",
                    redirectUrl: "/users/userdetails"
                });
                return [3 /*break*/, 6];
            case 5:
                res.json({
                    type: "success",
                    redirectUrl: "/users/profile"
                });
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                err_1 = _a.sent();
                console.log(err_1);
                res.json({
                    type: "error",
                    msg: "Server Error! Something bad must have happened."
                });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.signin = signin;
var profile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        user = req.body.user;
        res.render("users/profile", { user: user });
        return [2 /*return*/];
    });
}); };
exports.profile = profile;
var signout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.clearCookie("x-session-token");
        req.flash("success", "Successfully signed out.");
        res.redirect("/users/signin");
        return [2 /*return*/];
    });
}); };
exports.signout = signout;
var userDetails = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.body.user._id;
                req.body.status = "unverified";
                return [4 /*yield*/, user_service_1.updateGoogleUser(req.body, userId)];
            case 1:
                user = _a.sent();
                res.send(user);
                return [2 /*return*/];
        }
    });
}); };
exports.userDetails = userDetails;
//# sourceMappingURL=user.controller.js.map