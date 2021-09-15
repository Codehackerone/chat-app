import express from "express";
import { handleLogin, handleRegister } from "../controllers/terminalUser.controller";

const Router = express.Router();

Router.route('/api/login')
    .post(handleLogin)

Router.route('/api/register')
    .post(handleRegister)

export default Router;