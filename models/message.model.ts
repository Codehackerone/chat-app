import { Schema, model } from "mongoose";

const messageSchema = new Schema(
{
    room_id:{
        type:Schema.Types.ObjectId,
        ref:'Room',
    },
    username:{
        type: String,
        ref: "User",
        required:true
    },
    message:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    }
    },
    {
        timestamps: true,
    }
);

let Message = model("Message", messageSchema);

export default Message;
