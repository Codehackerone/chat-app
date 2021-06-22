"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var roomSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        "enum": ["dual", "group"]
    },
    users: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User"
        },
    ]
}, {
    timestamps: true
});
var Room = mongoose_1.model("Room", roomSchema);
exports["default"] = Room;
//# sourceMappingURL=room.model.js.map