import Room from "../models/room.model";
import User from "../models/user.model";

export const checkRoom = () => {
    return async (req: any, res: any, next: any) => {
        let usertochat:any=await User.findOne({_id:req.body.usertochatId})
        let room=await Room.findOne({type:'dual',users:[usertochat._id,req.body.user._id]});
        if(!room){
            let room_new=await Room.create({
                name:`${usertochat.name} and ${req.body.user.name}`,
                type:'dual',
                users:[
                    usertochat._id,
                    req.body.user._id
                ]
            })
            // TODO: redirect with room id
        }
        else{
            console.log('room exist');
            
            // TODO: redirect with room id
        }
    };
};
