import express from "express";
import { signin } from "../controllers/user.controller";
const Router=express.Router();

Router.route('/signin')
    .get(signin);

export default Router;