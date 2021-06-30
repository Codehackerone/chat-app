"use strict";
exports.__esModule = true;
exports.getRoomUsers = exports.userLeave = exports.getCurrentUser = exports.userJoin = void 0;
var users = [];
var userJoin = function (socket_id, username, room_id) {
    var user = { socket_id: socket_id, username: username, room_id: room_id };
    users.push(user);
    return user;
};
exports.userJoin = userJoin;
var getCurrentUser = function (socket_id) {
    return users.find(function (user) { return user.socket_id === socket_id; });
};
exports.getCurrentUser = getCurrentUser;
var userLeave = function (socket_id) {
    var index = users.findIndex(function (user) { return user.socket_id === socket_id; });
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};
exports.userLeave = userLeave;
var getRoomUsers = function (room_id) {
    return users.filter(function (user) { return user.room_id === room_id; });
};
exports.getRoomUsers = getRoomUsers;
//# sourceMappingURL=users.js.map