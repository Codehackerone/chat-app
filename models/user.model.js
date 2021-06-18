const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        picture_url: {
            type: String,
            default: 'none',
        },
        phone: {
            type: Number,
            unique: true,
        },
        address: {
            city: String,
            state: String,
            zip_code: String,
            street_address: String,
        },
        username: {
            type: String,
            unique: true,
        },
        status: {
            type: String,
            default: 'unverified',
            enum:['verified','unverified','banned']
        },
    }
)

export default userSchema;