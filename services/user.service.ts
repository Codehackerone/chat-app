import Users  from "../models/user.model";

export const checkGoogleUser=async(googleUserId)=>{
    let user=await Users.findById(googleUserId);
    return user;
}

export const addGoogleUser=async(userBody)=>{
    let user=await Users.create(userBody);
    return user;
}

export const updateGoogleUser=async(userBody,userId)=>{
    let user=await Users.findByIdAndUpdate(userId,userBody);
    return user;
}