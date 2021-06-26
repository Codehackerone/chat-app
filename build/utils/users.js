"use strict";
exports.__esModule = true;
exports.getRoomUsers =
  exports.userLeave =
  exports.getCurrentUser =
  exports.userJoin =
    void 0;
var users = [];
var userJoin = function (id, username, room) {
  var user = { id: id, username: username, room: room };
  users.push(user);
  return user;
};
exports.userJoin = userJoin;
var getCurrentUser = function (id) {
  return users.find(function (user) {
    return user.id === id;
  });
};
exports.getCurrentUser = getCurrentUser;
var userLeave = function (id) {
  var index = users.findIndex(function (user) {
    return user.id === id;
  });
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};
exports.userLeave = userLeave;
var getRoomUsers = function (room) {
  return users.filter(function (user) {
    return user.room === room;
  });
};
exports.getRoomUsers = getRoomUsers;
//# sourceMappingURL=users.js.map
