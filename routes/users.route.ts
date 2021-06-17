import express from "express";
import {
  googleauth,
  profile,
  renderSignin,
  signin,
} from "../controllers/user.controller";
import { authorize } from "../middlewares/auth.middleware";

const Router = express.Router();

Router.route("/signin").get(renderSignin).post(signin);

Router.route("/googleauth").get(googleauth);

Router.route('/profile')
  .get(authorize(), profile)

export default Router;
