"use strict";
exports.__esModule = true;
exports.googleauth = exports.signin = exports.renderSignin = void 0;
var redirectURI = "/users/googleauth";
var renderSignin = function (req, res) {
    res.render("signin");
};
exports.renderSignin = renderSignin;
var signin = function (req, res) {
    res.send("Google Login");
};
exports.signin = signin;
var googleauth = function (req, res) {
    res.send("Google Login Success");
};
exports.googleauth = googleauth;
//# sourceMappingURL=user.controller.js.map