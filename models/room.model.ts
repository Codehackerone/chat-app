import { Schema, model } from "mongoose";

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["dual", "group"],
    },
    users: [
      {
        type: String,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

let Room = model("Room", roomSchema);

export default Room;
