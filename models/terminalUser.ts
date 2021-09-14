import { Schema, model } from "mongoose";

const terminalUserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true, 
  },
  password: {
    type: String,
    required: true,
  },
});

let terminalUser = model("terminalUser", terminalUserSchema);

export default terminalUser;