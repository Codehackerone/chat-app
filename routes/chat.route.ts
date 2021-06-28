import express from "express";
import { authorize } from "../middlewares/auth.middleware";
import { renderIndex } from "../controllers/chat.controller";
import { createOrFetchRoom, roomChecker } from "../middlewares/roomchecker.middleware";

const Router = express.Router();

Router.route("/").get(authorize(), renderIndex);

Router.route("/chat")
    .post(authorize(),createOrFetchRoom(),(req:any,res:any)=>{
        if(req.body.room.new){
            req.flash('success',`Welcome to direct chatting with ${req.body.usertochat.username}`);
        }
        console.log('ok');
        res.redirect('/chat/home');
    })

Router.route('/home')
    .get(authorize(),roomChecker(),(req:any,res:any)=>{
        res.send('Joined chat');
    })

export default Router;
