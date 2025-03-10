import mongoose from 'mongoose'
const { Schema, model } = mongoose

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
})

userSchema.set('toJSON', {
    transform: (
        document: mongoose.Document,
        returnedObject: Record<string, unknown>
    ) => {
        returnedObject.id = (
            returnedObject._id as mongoose.Types.ObjectId
        ).toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    },
})

const User = model('User', userSchema)
export default User
