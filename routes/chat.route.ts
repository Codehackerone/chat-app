import express from "express";
import { authorize } from "../middlewares/auth.middleware";

const Router = express.Router();

Router.route("/")
    .get();

Router.route("/chat")
    .get();

export default Router;