export type PositiveNumber = number & { __positive__: true }

export function isPositiveNumber(value: number): value is PositiveNumber {
    return value > 0
}

interface User {
    id: number
    username: string
    created_at: string
}

interface TimeLogged {
    id: number
    category_id: number
    duration: number
    created_at: string
    user_id: number
}

interface TimeDuratio {
    duration: number
}

export { User, TimeLogged, TimeDuratio }
