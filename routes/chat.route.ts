import express from "express";
import { authorize } from "../middlewares/auth.middleware";
import { renderIndex, roomHandler } from "../controllers/chat.controller";
import {
  createOrFetchRoom,
  roomChecker,
} from "../middlewares/roomchecker.middleware";

const Router = express.Router();

Router.route("/").get(authorize(), renderIndex);

Router.route("/chat").post(
  authorize(),
  createOrFetchRoom(),
  roomChecker(),
  roomHandler
);

export default Router;
