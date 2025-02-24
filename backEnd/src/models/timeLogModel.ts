import mongoose from 'mongoose'

const { Schema, model } = mongoose

const timeLogSchema = new Schema({
    created_at: { type: String, required: true },
    duration: { type: Number, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

timeLogSchema.set('toJSON', {
    transform: (
        document: mongoose.Document,
        returnedObject: Record<string, unknown>
    ) => {
        returnedObject.id = (
            returnedObject._id as mongoose.Types.ObjectId
        ).toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})


const TimeLog = model("TimeLog", timeLogSchema)
export default TimeLog