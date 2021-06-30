const users = [];

export const userJoin = (socket_id:string, username:string, room_id:string) => {
  const user = { socket_id, username, room_id:`${room_id}` };
  users.push(user);
  return user;
};

export const getCurrentUser = (socket_id:string) => {
  return users.find((user) => user.socket_id === socket_id);
};

export const userLeave = (socket_id:string) => {
  const index = users.findIndex((user) => user.socket_id === socket_id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

export const getRoomUsers = (room_id:string) => {
  return users.filter((user) => user.room_id === String(room_id));
};
