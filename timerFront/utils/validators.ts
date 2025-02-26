import { z } from 'zod'

export const RemoteLoggedInUserSchema = z.object({
    id: z.string(),
    username: z.string().min(3).max(20),
    token: z.string(),
    times: z.array(z.string()),
})

export const toRemoteLoggedInUser = (user: unknown) => {
    return RemoteLoggedInUserSchema.parse(user)
}

export const RemoteUserSchema = RemoteLoggedInUserSchema.omit({token: true})

export const toRemoteUser = (user: unknown) => {
    return RemoteUserSchema.parse(user)
}

export const LocalStorageUserSchema = z.object({
    id: z.number(),
    username: z.string().min(3).max(20),
    password: z.string().min(8),
    server_id: z.string().nullable(),
    created_at: z.string(),
    token: z.string().nullable(),
})

export const toStorageUser = (user: unknown) => {
    return LocalStorageUserSchema.parse(user)
}
