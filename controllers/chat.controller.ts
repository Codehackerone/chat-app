import { allUsers } from "../services/user.service";

export const renderIndex = async (req: any, res: any) => {
  let users = await allUsers();
  const currentUser = req.body.user;
  res.render("chats/index", { users, currentUser });
};

export const roomHandler=async(req:any,res:any)=>{
  if(req.body.room.new){
    req.flash('success',`Welcome to direct chatting with ${req.body.usertochat.username}`);
  }
  res.send('Chat begin!!');
}