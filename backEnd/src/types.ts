import { z } from 'zod'
import { UserCredentialsSchema } from './utils'

export type UserCredentials = z.infer<typeof UserCredentialsSchema>
