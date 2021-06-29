import Room from "../models/room.model";
import jwt from 'jsonwebtoken';
import { findUser } from "../services/user.service";

export const createRoom = async (roomBody:any) => {
  let room = await Room.create(roomBody);
  return room;
};

export const findRoom=async(roomId:any)=>{
  let room = await Room.findOne({_id:roomId})
  return room;
}

export const verifyToken=async(token:any)=>{
  try
  {
    if(!token){
      throw "Invalid Token";
    }
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user=await findUser(decoded.user._id);
    if(!user){
      throw "User doesnt Exist"
    }
    let room:any=await findRoom(decoded.room._id);
    if(Object.keys(room).length===0 && room.users.includes(user._id)){
      throw "Room doesnt Exist";
    }
    return{
      user:user,
      room:room
    }
  }
  catch(err){
    throw `Error: ${err}`;
  }
}