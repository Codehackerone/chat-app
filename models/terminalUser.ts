import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

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

// terminalUserSchema.pre("save", async function (next) {
//   if (!this.isModified || !this.isNew) {
//     next();
//   } else this.isModified("password");
//   if (this.password) this.password = bcrypt.hashSync(String(this.password), 12);
//   next();
// });

let terminalUser = model("terminalUser", terminalUserSchema);

export default terminalUser;