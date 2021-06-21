import { Schema,model } from 'mongoose';

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
            required:true,
        },
        phone: {
            type: Number,
        },
        address: {
            type: String,
        },
        username: {
            type: String,
            unique: true,
        },
        status: {
            type: String,
            default: 'reg_incomplete',
            enum:['verified','unverified','banned','reg_incomplete']
        },
    }
)

let User = model('User', userSchema);

export default User;