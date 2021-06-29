import Users from "../models/user.model";

export const allUsers = async () => {
  let users = await Users.find({ status: "verified" });
  return users;
};

export const checkGoogleUser = async (googleUserId) => {
  let user = await Users.findById(googleUserId);
  return user;
};

export const addGoogleUser = async (userBody) => {
  let user = await Users.create(userBody);
  return user;
};

export const updateGoogleUser = async (userBody, userId) => {
  let user = await Users.findByIdAndUpdate(userId, userBody);
  return user;
};

export const ifUsernameExist = async (username) => {
  let user = await Users.findOne({ username: username });
  return user ? true : false;
};

export const findUser=async(userId)=>{
  let user = await Users.findById(userId);
  return user;
}
