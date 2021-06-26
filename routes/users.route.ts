import express from "express";
import {
  checkUsername,
  profile,
  renderSignin,
  renderUserDetails,
  signin,
  signout,
  userDetails,
} from "../controllers/user.controller";
import { authorize } from "../middlewares/auth.middleware";
import { validateUser } from "../middlewares/validator.middlewares";

const Router = express.Router();

Router.route("/signin").get(renderSignin).post(signin);

Router.route("/userdetails")
  .get(renderUserDetails)
  .post(authorize(), validateUser(), userDetails);

Router.route("/profile").get(authorize(), profile);

Router.route("/signout").all(authorize(), signout);

Router.route("/username")
  .all(checkUsername);

export default Router;
