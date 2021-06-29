import jwt from 'jsonwebtoken';
import { allUsers} from "../services/user.service";

const expiry_length = Number(process.env.EXPIRY) * 86400;
const jwt_headers = {
    algorithm: 'HS256',
    expiresIn: 1000*86400,
};

export const renderIndex = async (req: any, res: any) => {
  let users = await allUsers();
  const currentUser = req.body.user;
  res.render("chats/index", { users, currentUser });
};

export const roomHandler = async (req: any, res: any) => {
  const isnewRoom=(req.body.room.new)?true:false;
  const jwtToken = jwt.sign(
    { user:req.body.user, room: req.body.room, usertochat:req.body.usertochat},
    process.env.JWT_SECRET,
    jwt_headers
  );
  const roomName=req.body.room.name;
  res.render('chats/chat',{ isnewRoom,jwtToken,roomName });
};