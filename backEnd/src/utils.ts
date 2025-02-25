import { TimeLog, UserCredentials } from './types'
import { z } from 'zod'

export const UserCredentialsSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(8).max(25),
})
export const toUserCredentials = (object: unknown): UserCredentials => {
    return UserCredentialsSchema.parse(object)
}

const dateTimeRegex = /^\d{4}-\d{2}-\d{2}$/

export const TimeLogSchema = z.object({
    created_at: z
        .string()
        .regex(dateTimeRegex, 'Invalid date format! Must be YYYY-MM-DD')
        .refine(
            date => {
                console.log('validating date: ', date)
                return !isNaN(new Date(date).getTime())
            },
            {
                message: 'Invalid date! Must be a real date',
            }
        ),
    duration: z.number().min(1, 'Duration must be a positive number'),
    user_id: z.string(),
})

export const toTimeLog = (object: unknown): TimeLog => {
    return TimeLogSchema.parse(object)
}
