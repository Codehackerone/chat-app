"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var messageSchema = new mongoose_1.Schema({
    room_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Room'
    },
    username: {
        type: String,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
var Message = mongoose_1.model("Message", messageSchema);
exports["default"] = Message;
//# sourceMappingURL=message.model.js.map