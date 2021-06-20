import { verify } from "../helpers/verifyUser";

export const renderSignin = (req: any, res: any) => {
  res.render("users/signin");
};

export const signin = async (req: any, res: any) => {
  let token = req.body.token;
  try {
    var user: any = await verify(token);
    res.cookie("session-token", token);
    res.send("success");
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
