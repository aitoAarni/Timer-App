import { z } from 'zod'
import { TimeLogSchema, UserCredentialsSchema } from './utils'

export type UserCredentials = z.infer<typeof UserCredentialsSchema>
export type TimeLog = z.infer<typeof TimeLogSchema>
