import { allUsers } from "../services/user.service";
import {} from "../services/chat.service";

export const renderIndex=async(req:any,res:any)=>{
    let users=await allUsers();
    res.render('chats/index',{users});
}