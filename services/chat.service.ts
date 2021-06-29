import Room from "../models/room.model";

export const createRoom = async (roomBody) => {
  let room = await Room.create(roomBody);
  return room;
};

export const findRoom=async(roomId,userId)=>{
  let room = await Room.findOne({_id:roomId,users:[userId]})
  return room;
}