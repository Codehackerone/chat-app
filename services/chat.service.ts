import Chat from "../models/room.model";

export const createRoom = async (roomBody) => {
  let room = await Chat.create(roomBody);
  return room;
};
