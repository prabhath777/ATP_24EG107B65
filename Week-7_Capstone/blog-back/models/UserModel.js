//create user schema and model 

import { Schema, model } from 'mongoose'

//create schema{product, count}
const cartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product',
    },
    count: {
        type: Number,
        default: 1,
    },
})

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        username: {
            type: String,
            minlength: [5, 'min length of user name '],
            maxlength: [12, 'username size exceeds'],
        },
        password: {
            type: String,
            required: [true, 'password kavali'],
        },
        email: {
            type: String,
            required: [true, 'email kavali'],
            unique: [true, 'email must be unique'],
        },
        role: {
            type: String,
            enum: ['USER', 'AUTHOR'],
            default: 'USER',
        },
        profileImageUrl: {
            type: String,
        },
        age: {
            type: Number,
        },
        cart: [cartSchema],
    },
    {
        versionKey: false,
        timestamps: true,
    },
)

export const UserModel = model('user', UserSchema)































