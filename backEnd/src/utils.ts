import { UserCredentials } from './types'
import { z } from 'zod'

export const UserCredentialsSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(8).max(25),
})
export const toUserCredentials = (object: unknown): UserCredentials => {
    return UserCredentialsSchema.parse(object)
}
