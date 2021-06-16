import express from "express";
import { googleauth, signin } from "../controllers/user.controller";
const Router=express.Router();

Router.route('/signin')
    .get(signin);

Router.route('/googleauth')
    .get(googleauth);

export default Router;