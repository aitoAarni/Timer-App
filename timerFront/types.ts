import { z } from 'zod'
import {
    DisplayTimeLogSchema,
    LocalStorageUserSchema,
    NearbyUserSchema,
    RankingsSchema,
    RemoteLoggedInUserSchema,
} from './utils/validators'

export type PositiveNumber = number & { __positive__: true }

export function isPositiveNumber(value: number): value is PositiveNumber {
    return value > 0
}

export interface User {
    id: number
    username: string
    password: string
    server_id: string | null
    created_at: string
}
export type StorageUser = z.infer<typeof LocalStorageUserSchema>

export type RemoteUser = z.infer<typeof RemoteLoggedInUserSchema>

export interface TimeLogged {
    id: number
    category_id: number
    duration: number
    created_at: string
    user_id: number
}

export type NearbyUser = z.infer<typeof NearbyUserSchema>

export type Rankings = z.infer<typeof RankingsSchema>

export interface TimeDuratio {
    duration: number
}


export type DisplayTimeLogs = z.infer<typeof DisplayTimeLogSchema>

export interface AreaChartData {
    value: number
    label?: string
    endFillColor?: string
    labelComponent?: (val: string) => React.JSX.Element
    secondaryLabel?: string
    labelTextStyle?: { color: string }
}

export interface Settings {
    workTimeLength: number
    breakTimeLength: number
}
