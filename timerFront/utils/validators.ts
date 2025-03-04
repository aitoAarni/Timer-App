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

export const RemoteUserSchema = RemoteLoggedInUserSchema.omit({ token: true })

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

export const LocalDatabaseUsersSchema = z.array(
    LocalStorageUserSchema.omit({
        token: true,
    })
)

export const toLocalDatabaseUsers = (data: unknown) => {
    return LocalDatabaseUsersSchema.parse(data)
}

export const NearbyUserSchema = z.object({
    rank: z.number().int().positive(),
    user_id: z.string().min(1),
    username: z.string().min(1).max(20),
    duration: z.number().int().nonnegative(),
})

export const RankingsSchema = z.object({
    userRank: z.number().int().positive(),
    userDuration: z.number().int().nonnegative(),
    totalParticipants: z.number().int().positive(),
    nearbyUsers: z.array(NearbyUserSchema),
})

export const toRankings = (data: unknown) => {
    return RankingsSchema.parse(data)
}

export const DisplayTimeLogSchema = z.array(
    z.object({
        total_duration: z.number().int().min(0),
        date: z.string(),
    })
)

export const toDisplayTimeLog = (data: unknown) => {
    return DisplayTimeLogSchema.parse(data)
}

export const localTimeLogSchema = z.object({
    id: z.number().int().positive(),
    category_id: z.number().int().min(1, 'Category ID is required'),
    duration: z.number().int().min(0),
    created_at: z.string(),
    user_id: z.number().int().min(1, 'User ID is required'),
})

export const toLocalTimeLogSchema = (data: unknown) => {
    return localTimeLogSchema.parse(data)
}
