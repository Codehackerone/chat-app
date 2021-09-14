import express from "express";
import { handleLogin, handleRegister } from "../controllers/terminalUser.controller";

const Router = express.Router();

Router.route('/login')
    .post(handleLogin)

Router.route('/register')
    .post(handleRegister)

export default Router;