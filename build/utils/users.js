"use strict";
exports.__esModule = true;
exports.getCurrentUser = exports.userJoin = void 0;
var users = [];
var userJoin = function (id, username, room) {
    var user = { id: id, username: username, room: room };
    users.push(user);
    return user;
};
exports.userJoin = userJoin;
var getCurrentUser = function (id) {
    return users.find(function (user) { return user.id === id; });
};
exports.getCurrentUser = getCurrentUser;
//# sourceMappingURL=users.js.map