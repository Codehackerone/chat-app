import Room from "../models/room.model";
import User from "../models/user.model";

export const createOrFetchRoom = () => {
  return async (req: any, res: any, next: any) => {
    try {
      let usertochat: any = await User.findOne({ _id: req.body.usertochatId });
      let room: any = await Room.findOne({
        type: "dual",
        users: [usertochat._id, req.body.user._id],
      });
      if (!room) {
        room = await Room.create({
          name: `${usertochat.name} and ${req.body.user.name}`,
          type: "dual",
          users: [usertochat._id, req.body.user._id],
        });
        room.type = "new";
      }
      req.body.room = room;
      req.body.usertochat = usertochat;
      next();
    } catch (err) {
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
