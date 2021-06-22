import express from "express";
import { authorize } from "../middlewares/auth.middleware";
import { renderIndex } from "../controllers/chat.controller";

const Router = express.Router();

Router.route("/")
    .get(authorize(),renderIndex);

Router.route("/chat")
    .get();

export default Router;