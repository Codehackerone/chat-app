import jwt from 'jsonwebtoken';
import { allUsers } from "../services/user.service";

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
    { room: req.body.room, usertochat:req.body.usertochat },
    process.env.JWT_SECRET,
    jwt_headers
  );
  res.send("Chat begin!!");
};