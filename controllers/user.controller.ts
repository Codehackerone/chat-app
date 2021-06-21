import { verify } from "../helpers/verifyUser";
import { addGoogleUser, checkGoogleUser } from "../services/user.service";

export const renderSignin = (req: any, res: any) => {
  res.render("users/signin");
};

export const signin = async (req: any, res: any) => {
  let token = req.body.token;
  try {
    let user: any = await verify(token);
    let gUser=await checkGoogleUser(user.id);
    if(!gUser){

    }
    res.cookie("session-token", token);
    res.json({
      type:'success',
      redirectUrl:'/users/profile'
    });
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
