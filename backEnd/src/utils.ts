import { TimeLog, UserCredentials } from './types'
import { z } from 'zod'

export const UserCredentialsSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(8).max(25),
})
export const toUserCredentials = (object: unknown): UserCredentials => {
    return UserCredentialsSchema.parse(object)
}

export const TimeLogSchema = z.object({
    created_at: z.string(),
    duration: z.number(),
    user_id: z.string(),
})

export const toTimeLog = (object: unknown): TimeLog => {
    return TimeLogSchema.parse(object)
}
