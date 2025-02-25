import { toTimeLog, toUserCredentials } from '../utils'

describe('toUserCrednetials function', () => {
    it('converts valid user correctly', () => {
        const user = {
            username: 'test User',
            password: 'validPassword',
        }
        const result = toUserCredentials(user)
        expect(result).toEqual(user)
    })
    it('Throws error when password invalid', () => {
        const user = {
            username: 'validUsername',
            password: 'invalid',
        }
        expect(() => {
            toUserCredentials(user)
        }).toThrow(/String must contain at least 8 character\(s\)/)
    })
    it('Throws error when username invalid', () => {
        const user = {
            username: 'te',
            password: 'validPassword',
        }
        expect(() => {
            toUserCredentials(user)
        }).toThrow(/String must contain at least 3 character\(s\)/)
    })
})

describe('toTimeLog function', () => {
    it('Converts valid time log correctly', () => {
        const input = {
            created_at: '2025-02-24',
            duration: 3600,
            user_id: '67b628d7c22cdf7238ba76aa',
        }
        const result = toTimeLog(input)

        expect(result).toEqual(input) // Should return the same valid input
    })

    it('Throws error for invalid date', () => {
        expect(() => {
            toTimeLog({
                created_at: '2025-13-24',
                duration: 3600,
                user_id: '67b628d7c22cdf7238ba76aa',
            })
        }).toThrow(/Invalid date! Must be a real date/)
    })

    it('Throws error if duration is missing', () => {
        expect(() => {
            toTimeLog({
                created_at: '2025-02-24',
                user_id: '67b628d7c22cdf7238ba76aa',
            })
        }).toThrow(/Required/)
    })
})
