// @ts-nocheck
import { createLocalUser, createRemoteUser } from '@/services/userServices'

let mockInsert = jest.fn(async (...args) => {})

jest.mock('@/storage/local/userQueries', () => ({
    insertUserQuery: 'mock query',
}))

jest.mock('@/storage/local/queryDatabase', () => ({
    insert: (...args) => {
        return mockInsert(...args)
    },
}))

global.fetch = jest.fn()

describe('User Creation Functions', () => {
    let consoleErrorSpy: jest.SpyInstance
    beforeEach(() => {
        jest.clearAllMocks()
        consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {})
    })

    afterEach(() => {
        consoleErrorSpy.mockRestore()
    })
    describe('createLocalUser', () => {
        beforeEach(() => {
            mockInsert = jest.fn((...args) => {})
        })
        it('should call insert with correct parameters', async () => {
            await createLocalUser('testUser', 'password123', 'server123')
            expect(mockInsert).toHaveBeenCalledWith("mock query",
                ['testUser',
                'password123',
                'server123']
            )
        })

        it('should throw an error if insert fails', async () => {
            mockInsert = jest.fn((...args) => {
                throw new Error('Database Error')
            })

            await expect(
                createLocalUser('testUser', 'password123')
            ).rejects.toThrow('Database Error')

            expect(mockInsert).toHaveBeenCalled()
        })
    })

    describe('createRemoteUser', () => {
        const mockResponse = {
            id: '123',
            username: 'testUser',
            token: 'validToken123',
            times: ['2024-02-22T10:00:00Z'],
        }

        it('should return the API response on success', async () => {
            ;(global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockResponse),
            })

            const result = await createRemoteUser('testUser', 'password123')

            expect(fetch).toHaveBeenCalledWith(
                'http://192.168.1.120:3000/api/user/create',
                expect.objectContaining({
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: 'testUser',
                        password: 'password123',
                    }),
                })
            )
            expect(result).toEqual(mockResponse)
        })

        it('should return null if API response is not OK', async () => {
            ;(global.fetch as jest.Mock).mockResolvedValue({
                ok: false,
                text: jest.fn().mockResolvedValue('User already exists'),
            })

            const result = await createRemoteUser('testUser', 'password123')

            expect(fetch).toHaveBeenCalled()
            expect(result).toBeNull()
        })

        it('should throw an error if fetch fails (network error)', async () => {
            ;(global.fetch as jest.Mock).mockRejectedValue(
                new Error('Network Error')
            )

            await expect(
                createRemoteUser('testUser', 'password123')
            ).rejects.toThrow('Network Error')

            expect(fetch).toHaveBeenCalled()
        })
    })
})
