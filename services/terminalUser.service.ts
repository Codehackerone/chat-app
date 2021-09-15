import terminalUser from "../models/terminalUser";
import bcrypt from "bcryptjs";

export const registerService:any=async(username:String, password:String)=>{
    let hashedPassword:String=bcrypt.hashSync(String(password), 12);
    let user:any=await terminalUser.create({
        username,
        password:hashedPassword
    });
    return user;
}

export const loginService:any=async(username:String, password:String)=>{
    let user:any = await terminalUser.findOne({username:username});
    if(!user)throw "invalid username entered";
    if(!bcrypt.compareSync(password, user.password))throw "incorrect password";
    return user;
}