import express from "express";
import { authorize } from "../middlewares/auth.middleware";
import { renderIndex } from "../controllers/chat.controller";
import { checkRoom } from "../middlewares/roomchecker.middleware";

const Router = express.Router();

Router.route("/").get(authorize(), renderIndex);

Router.route("/chat")
    .post(authorize(),checkRoom(),(req:any,res:any)=>{
        res.send('Hello!');
    })
    .get();

export default Router;
