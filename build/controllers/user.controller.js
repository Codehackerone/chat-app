"use strict";
exports.__esModule = true;
exports.googleauth = exports.signin = exports.renderSignin = void 0;
var redirectURI = "/users/googleauth";
var verifyUser_1 = require("../utils/verifyUser");
var renderSignin = function (req, res) {
    res.render("signin");
};
exports.renderSignin = renderSignin;
var signin = function (req, res) {
    var token = req.body.token;
    verifyUser_1.verify(token)
        .then(function () {
        res.cookie('session-token', token);
        res.send('success');
    })["catch"](console.error);
};
exports.signin = signin;
var googleauth = function (req, res) {
    res.send("Google Login Success");
};
exports.googleauth = googleauth;
//# sourceMappingURL=user.controller.js.map