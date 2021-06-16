import express from "express";
const Router=express.Router();

Router.route('/signin')
    .get(async(req,res)=>{
        res.send('login here');
    })

export default Router;