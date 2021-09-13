import Room from "../models/room.model";
import User from "../models/user.model";
const crypto = require("crypto");

export const createOrFetchRoom = () => {
  return async (req: any, res: any, next: any) => {
    try {
      let usertochat: any = await User.findOne({ _id: req.body.usertochatId });
      let room: any = await Room.findOne({
        type: "dual",
        $or: [ { users: [usertochat._id, req.body.user._id] },{ users: [req.body.user._id,usertochat._id ] } ]
      });
      if (!room) {
        room = await Room.create({
          name: `${usertochat.name} and ${req.body.user.name}`,
          type: "dual",
          users: [usertochat._id, req.body.user._id],
        });
        room.type = "new";
        const user1 = crypto.getDiffieHellman("modp15");
        const user2 = crypto.getDiffieHellman("modp15");
        const user1PrivateKey = user1.generateKeys();
        const user2PrivateKey = user2.generateKeys();
        const user1PublicKey = user1.getPublicKey();
        const user2PublicKey = user2.getPublicKey();
        let userBody=req.body.user;
        userBody.keys.push({
          oppositeUsername: usertochat.username, 
          privateKey: user1PrivateKey,
          oppositePublicKey: user2PublicKey,
        })
        await User.findOneAndUpdate({ _id: req.body.user._id }, userBody);
        let userToChatBody=usertochat;
        userToChatBody.keys.push({
          oppositeUsername: req.body.user.username,
          privateKey: user2PrivateKey,
          oppositePublicKey: user1PublicKey,
        })
        await User.findOneAndUpdate({ _id: usertochat._id }, userToChatBody);
      }
      req.body.room = room;
      req.body.usertochat = usertochat;
      next();
    } catch (err) {
      console.log(err);
      
      req.flash("err", "Something went wrong!");
      res.redirect("/chat/");
    }
  };
};

export const roomChecker = () => {
  return async (req: any, res: any, next: any) => {
    try {
      if (!req.body.room) {
        req.flash("err", "Room doesnt exist!");
        res.redirect("/chat/");
        return;
      }
      let room = await Room.findById(req.body.room._id);
      if (!room) {
        req.flash("err", "Room doesnt exist!");
        res.redirect("/chat/");
        return;
      }
      next();
    } catch (err) {
      req.flash("err", "Room doesnt exist!");
      res.redirect("/chat/");
    }
  };
};
