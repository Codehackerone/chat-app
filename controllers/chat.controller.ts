import jwt from 'jsonwebtoken';
import { allUsers,findUser } from "../services/user.service";
import { findRoom } from "../services/chat.service";

const expiry_length = parseInt(process.env.EXPIRY) * 86400;
const jwt_headers = {
    algorithm: 'HS256',
    expiresIn: expiry_length,
};

export const renderIndex = async (req: any, res: any) => {
  let users = await allUsers();
  const currentUser = req.body.user;
  res.render("chats/index", { users, currentUser });
};

export const roomHandler = async (req: any, res: any) => {
  const isnewRoom=(req.body.room.new)?true:false;
  const jwtToken = jwt.sign(
    { user:req.body.user, room: req.body.room},
    process.env.JWT_SECRET,
    jwt_headers
  );
  res.send("Chat begin!!");
};

export const verifyToken=async(req:any,res:any)=>{
  try
  {
    let token=req.body.jwtToken;
    if(!token){
      throw "Invalid Token";
    }
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user=await findUser(decoded.user._id);
    if(!user){
      throw "User doesnt Exist"
    }
    let room=await findRoom(decoded.room._id,decoded.user._id);
    if(!room){
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