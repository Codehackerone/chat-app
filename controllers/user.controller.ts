import { verify } from "../helpers/verifyUser";
import { addGoogleUser, checkGoogleUser } from "../services/user.service";

let options = {
    path: '/',
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24 * Number(process.env.EXPIRY), // would expire after 30 days
    httpOnly: true, // The cookie only accessible by the web server
};

export const renderSignin = (req: any, res: any) => {
  res.render("users/signin");
};

export const renderUserDetails=(req: any, res: any) => {
  res.render("users/signin");
};

export const signin = async (req: any, res: any) => {
  let token = req.body.token;
  try {
    let user: any = await verify(token);
    let gUser=await checkGoogleUser(user.id);
    res.cookie("session-token", token,options);
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
  res.clearCookie("session-token");
  res.redirect("/users/signin");
};
