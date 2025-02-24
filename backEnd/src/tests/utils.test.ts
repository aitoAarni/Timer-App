import { toTimeLog } from '../utils'

describe('toTimeLog function', () => {
    it('Converts valid input correctly', () => {
        const input = {
            created_at: '2025-02-24 14:30:45',
            duration: 3600,
            user_id: '67b628d7c22cdf7238ba76aa',
        }
        const result = toTimeLog(input)

        expect(result).toEqual(input) // Should return the same valid input
    })

    it('Throws error for invalid date', () => {
        expect(() => {
            toTimeLog({
                created_at: '2025-13-24 14:30:45',
                duration: 3600,
                user_id: '67b628d7c22cdf7238ba76aa',
            })
        }).toThrow(/Invalid date! Must be a real date/)
    })

    it('Throws error if duration is missing', () => {
        expect(() => {
            toTimeLog({
                created_at: '2025-02-24 14:30:45',
                user_id: '67b628d7c22cdf7238ba76aa',
            })
        }).toThrow(/Required/)
    })
})
