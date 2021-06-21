import { verify } from "../helpers/verifyUser";
import { addGoogleUser, checkGoogleUser, updateGoogleUser } from "../services/user.service";

let options = {
    path: '/',
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
};

export const renderSignin = (req: any, res: any) => {
  res.render("users/signin");
};

export const renderUserDetails=(req: any, res: any) => {
  res.render("users/userdetails");
};

export const signin = async (req: any, res: any) => {
  let token = req.body.token;
  try {
    let user: any = await verify(token);
    let gUser=await checkGoogleUser(user._id);
    res.cookie("x-session-token", token,options);
    if(!gUser){
      let new_gUser=await addGoogleUser(user);
      res.json({
        type:'success',
        redirectUrl:'/users/userdetails'
      });
    }
    else{
      res.json({
        type:'success',
        redirectUrl:'/users/profile'
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const profile = async (req: any, res: any) => {
  let user = req.user;
  res.render("users/profile", { user });
};

export const signout = async (req: any, res: any) => {
  res.clearCookie("x-session-token");
  res.redirect("/users/signin");
};

export const userDetails=async(req:any,res:any)=>{
  const userId=req.body.user._id;
  let user=await updateGoogleUser(req.body,userId);
  res.send(user);
}