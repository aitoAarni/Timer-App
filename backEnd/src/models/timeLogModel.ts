import mongoose from 'mongoose'
const isValidDateTime = (value: string): boolean => {
    const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/

    if (!dateTimeRegex.test(value)) {
        return false
    }

    const [datePart, timePart] = value.split(' ')
    const [year, month, day] = datePart.split('-').map(Number)
    const [hour, minute, second] = timePart.split(':').map(Number)

    const date = new Date(year, month - 1, day, hour, minute, second)

    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day &&
        date.getHours() === hour &&
        date.getMinutes() === minute &&
        date.getSeconds() === second
    )
}
const { Schema, model } = mongoose

const timeLogSchema = new Schema({
    created_at: {
        type: String,
        required: true,
        validate: {
            validator: isValidDateTime,
            message: (props: { value: string }) =>
                `${props.value} is not a valid timestamp! Must be in format YYYY-MM-DD HH:MM:SS`,
        },
    },
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

const TimeLog = model('TimeLog', timeLogSchema)
export default TimeLog
