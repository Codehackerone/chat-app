import express from "express";
import {
  googleauth,
  renderSignin,
  signin,
} from "../controllers/user.controller";
const Router = express.Router();

Router.route("/signin").get(renderSignin).post(signin);

Router.route("/googleauth").get(googleauth);

export default Router;
