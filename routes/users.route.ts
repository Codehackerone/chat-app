import express from "express";
import {
  profile,
  renderSignin,
  renderUserDetails,
  signin,
  signout,
} from "../controllers/user.controller";
import { authorize } from "../middlewares/auth.middleware";

const Router = express.Router();

Router.route("/signin")
  .get(renderSignin)
  .post(signin);

Router.route("/userdetails")
  .get(renderUserDetails);

Router.route("/profile").get(authorize(), profile);

Router.route("/signout").all(authorize(), signout);

export default Router;
