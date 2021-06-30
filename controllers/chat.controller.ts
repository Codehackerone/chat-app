import jwt from 'jsonwebtoken';
import { allUsers,findUser } from "../services/user.service";
import { getMessageByRoom } from "../services/message.service";

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
  try{
    const isnewRoom=(req.body.room.new)?true:false;
    const jwtToken = jwt.sign(
      { user:req.body.user, room: req.body.room},
      process.env.JWT_SECRET,
      jwt_headers
    );
    let usernames=[];
    for(let user_id of req.body.room.users){
      let user:any=await findUser(user_id);
      usernames.push(user.username);
    }
    const roomName=req.body.room.name;
    const messages=await getMessageByRoom(req.body.room._id);
    res.render('chats/chat',{ isnewRoom,jwtToken,roomName,usernames,messages });
  }
  catch(err){
    req.flash('err',"Error: "+err);
    res.redirect('/chat/');
  }
};