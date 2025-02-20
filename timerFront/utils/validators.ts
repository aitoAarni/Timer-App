import { z } from 'zod'

export const RemoteUserSchema = z.object({
    id: z.string(),
    username: z.string().min(3).max(3),
    token: z.string(),
    times: z.array(z.string()),
})

export const toRemoteUser = (user: unknown) => {
    return RemoteUserSchema.parse(user)
}
