export type PositiveNumber = number & { __positive__: true }

export function isPositiveNumber(value: number): value is PositiveNumber {
    return value > 0
}

export interface User {
    id: number
    username: string
    password: string
    server_id: string
    created_at: string
}

export interface TimeLogged {
    id: number
    category_id: number
    duration: number
    created_at: string
    user_id: number
}

export interface TimeDuratio {
    duration: number
}

export interface DatesWithDuration {
    date: string
    total_duration: number
}

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
