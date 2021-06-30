import Message from "../models/message.model";

export const addMessage=async(messageBody:any)=>{
    try{
        await Message.create(messageBody);
    }
    catch(err){
        console.log(err);
    }
}

export const getMessageByRoom=async(roomId:any)=>{
    let messages=await Message.find({room_id:roomId});
    return messages;
}