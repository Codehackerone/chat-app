import { verify } from "../helpers/verifyUser";
import {
  addGoogleUser,
  checkGoogleUser,
  ifUsernameExist,
  updateGoogleUser,
} from "../services/user.service";

let options = {
  path: "/",
  sameSite: true,
  maxAge: 1000 * 60 * 60 * 24 * 30,
  httpOnly: true,
};

export const renderSignin = (req: any, res: any) => {
  res.render("users/signin");
};

export const renderUserDetails = (req: any, res: any) => {
  res.render("users/userdetails");
};

export const signin = async (req: any, res: any) => {
  let token = req.body.token;
  try {
    let user: any = await verify(token);
    let gUser = await checkGoogleUser(user._id);
    res.cookie("x-session-token", token, options);
    if (!gUser) {
      let new_gUser = await addGoogleUser(user);
      res.json({
        type: "success",
        redirectUrl: "/users/userdetails",
      });
    } else {
      res.json({
        type: "success",
        redirectUrl: "/users/profile",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      type: "error",
      msg: "Server Error! Something bad must have happened.",
    });
  }
};

export const profile = async (req: any, res: any) => {
  let user = req.body.user;
  res.render("users/profile", { user });
};

export const signout = async (req: any, res: any) => {
  res.clearCookie("x-session-token");
  req.flash("success", "Successfully signed out.");
  res.redirect("/users/signin");
};

export const userDetails = async (req: any, res: any) => {
  try{
    const userId = req.body.user._id;
    req.body.status = "unverified";
    let user = await updateGoogleUser(req.body, userId);
    res.redirect('/users/profile');
  }
  catch(err){
    req.flash("success", "Server Error.");
    res.redirect("/users/signin");
  }
};

export const checkUsername=async(req:any,res:any)=>{
  res.send((!req.query.username)?false:(await ifUsernameExist(req.query.username)));
}