"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    picture_url: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    username: {
        type: String,
        unique: true
    },
    dob: {
        type: Date
    },
    status: {
        type: String,
        "default": "reg_incomplete",
        "enum": ["verified", "unverified", "banned", "reg_incomplete"]
    }
});
var User = mongoose_1.model("User", userSchema);
exports["default"] = User;
//# sourceMappingURL=user.model.js.map