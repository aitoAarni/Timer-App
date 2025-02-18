import mongoose from 'mongoose'

const { Schema, model } = mongoose

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => new Date().toUTCString(),
        immutable: true,
    },
    times: [
        {type}
    ]
})

const User = model('User', userSchema)
export default User
