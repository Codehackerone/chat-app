import { verify } from "../helpers/verifyUser";
import { checkGoogleUser } from "../services/user.service";

export const authorize = () => {
  return async (req: any, res: any, next: any) => {
    try {
      let token = req.cookies["x-session-token"];
      if (!token) {
        req.flash("err", "Token Expired");
        res.redirect("/users/signin");
        return;
      }
      const user: any = await verify(token);
      if (!user) {
        req.flash("err", "User Not Found. Please register again.");
        res.redirect("/users/signin");
        return;
      }
      let gUser: any = await checkGoogleUser(user._id);
      if (!gUser) {
        req.flash("err", "User not registered. Please register again.");
        res.redirect("/users/signin");
        return;
      } else if (
        gUser.status === "reg_incomplete" &&
        req.url !== "/userdetails"
      ) {
        req.flash("err", "Registration Incomplete. Please provide the details");
        res.redirect("/users/userdetails");
        return;
      } else if (gUser.status === "unverified") {
        req.flash(
          "warning",
          "This application is in beta. Contact the developer to give you special access"
        );
        res.redirect("/users/signin");
        return;
      } else if (gUser.status === "banned") {
        req.flash("alert", "You are banned");
        res.redirect("/users/signin");
        return;
      }
      req.body.user = gUser;
      if (req.originalUrl === "/users/signin" && req.url === "/profile")
        req.flash("success", "Signed in successfully.");
      next();
    } catch (err) {
      req.flash("err", "Session Expired! Please login Again");
      //console.log(err);
      res.redirect("/users/signin");
    }
  };
};
