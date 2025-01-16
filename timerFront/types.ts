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

interface DatesWithDuration {
    date: string
    total_duration: number
}

interface AreaChartData {
    value: number
    label?: string
    endFillColor?: string
    labelComponent?: (val: string) => React.JSX.Element
    secondaryLabel?: string
    labelTextStyle?: { color: string }
}

export { User, TimeLogged, TimeDuratio, DatesWithDuration, AreaChartData }
