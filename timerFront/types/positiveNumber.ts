export type PositiveNumber = number & { __positive__: true }

export function isPositiveNumber(value: number): value is PositiveNumber {
    return value > 0
}
