import { Schema } from 'mongoose';

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
            type: String,
            required: true
        },
        username: {
            type: String,
            unique: true,
            required:true,
        },
        status: {
            type: String,
            default: 'reg_incomplete',
            enum:['verified','unverified','banned','reg_incomplete']
        },
    }
)

export default userSchema;