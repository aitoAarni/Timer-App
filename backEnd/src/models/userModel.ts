import mongoose from 'mongoose'
const { Schema, model } = mongoose

const url = process.env.MONGODB_URI
if (!url) {
    throw new Error('MONGODB_URI environmental variable is not set')
}

mongoose
    .connect(url)
    .then(() => console.log('connected to db'))
    .catch(error => {
        console.error(
            'error connecting to db',
            error instanceof Error ? error.message : String(error)
        )
    })

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
        default: () => Date.now(),
        immutable: true,
    },
    times: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TimeLog',
        },
    ],
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
