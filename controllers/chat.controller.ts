import { allUsers } from "../services/user.service";
import {} from "../services/chat.service";

export const renderIndex=async(req:any,res:any)=>{
    let users=await allUsers();
    const currentUser=req.body.user;
    res.render('chats/index',{users,currentUser});
}