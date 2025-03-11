// @ts-nocheck
import createUser, {
    getLocalUsers,
    getLocalUserByUsername,
    removeLocalUser,
    createLocalUser,
    createRemoteUser,
} from '@/services/userServices'
import { fetchAll, fetchOne, insert } from '@/storage/local/queryDatabase'
import {
    getUserByUsernameQuery,
    getUsersQuery,
    insertUserQuery,
    removeUserByUsernameQuery,
} from '@/storage/local/userQueries'
import {
    toLocalDatabaseUser,
    toLocalDatabaseUsers,
    toRemoteUser,
} from '@/utils/validators'

jest.mock('@/storage/local/userQueries', () => ({
    insertUserQuery: 'mock query',
}))

jest.mock('@/storage/local/queryDatabase', () => ({
    insert: jest.fn(),
    fetchAll: jest.fn(),
    fetchOne: jest.fn(),
}))

global.fetch = jest.fn()

jest.mock('@/utils/validators', () => ({
    toLocalDatabaseUser: jest.fn(user => {
        return user
    }),
    toLocalDatabaseUsers: jest.fn(users => {
        return users
    }),
    toRemoteUser: jest.fn(user => {
        return user
    }),
}))

jest.mock("@/utils/environment", () => ({
    BACK_END_URL: "http://192.168.1.120:3000"
}))


describe('User Storage Functions', () => {
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

    describe('getLocalUsers', () => {
        it('should fetch all users and transform them', async () => {
            const mockUsers = [{ id: '1', username: 'testuser' }]
            fetchAll.mockResolvedValue(mockUsers)
            const result = await getLocalUsers()

            expect(fetchAll).toHaveBeenCalledWith(getUsersQuery)
            expect(toLocalDatabaseUsers).toHaveBeenCalledWith(mockUsers)
            expect(result).toEqual(mockUsers)
        })

        it('should throw an error if fetching users fails', async () => {
            ;(fetchAll as jest.Mock).mockRejectedValue(
                new Error('DB fetch failed')
            )

            await expect(getLocalUsers()).rejects.toThrow('DB fetch failed')
        })
    })

    describe('getLocalUserByUsername', () => {
        it('should fetch a user by username and transform it', async () => {
            const mockUser = { id: '1', username: 'testuser' }
            fetchOne.mockResolvedValue(mockUser)

            const result = await getLocalUserByUsername('testuser')

            expect(fetchOne).toHaveBeenCalledWith(getUserByUsernameQuery, [
                'testuser',
            ])
            expect(toLocalDatabaseUser).toHaveBeenCalledWith(mockUser)
            expect(result).toEqual(mockUser)
        })

        it('should return null if fetching user fails', async () => {
            ;(fetchOne as jest.Mock).mockRejectedValue(
                new Error('DB fetch failed')
            )

            const result = await getLocalUserByUsername('testuser')

            expect(result).toBeNull()
        })
    })

    describe('removeLocalUser', () => {
        it('should call fetchOne to remove a user by username', async () => {
            ;(fetchOne as jest.Mock).mockResolvedValue(undefined)

            await removeLocalUser('testuser')

            expect(fetchOne).toHaveBeenCalledWith(removeUserByUsernameQuery, [
                'testuser',
            ])
        })

        it('should throw an error if removal fails', async () => {
            ;(fetchOne as jest.Mock).mockRejectedValue(
                new Error('DB removal failed')
            )

            await expect(removeLocalUser('testuser')).rejects.toThrow(
                'DB removal failed'
            )
        })
    })

    describe('createUser', () => {
        it('should create a remote user and then store it locally', async () => {
            const mockResponse = {
                id: '123',
                username: 'testUser',
                token: 'validToken123',
                times: ['2024-02-22T10:00:00Z'],
            }
            ;(global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockResponse),
            })

            const result = await createUser('testuser', 'password')
            expect(result).toBeUndefined()
        })

        it('should still attempt to create a local user even if remote creation fails', async () => {
            const mockResponse = {
                id: '123',
                username: 'testUser',
                token: 'validToken123',
                times: ['2024-02-22T10:00:00Z'],
            }
            ;(global.fetch as jest.Mock).mockRejectedValue(
                new Error('Remote user creation failed')
            )
            await expect(createUser('testuser', 'password')).rejects.toThrow(
                'Remote user creation failed'
            )
        })
    })


    describe('createLocalUser', () => {
        beforeEach(() => {})
        it('should call insert with correct parameters', async () => {
            await createLocalUser('testUser', 'password123', 'server123')
            expect(insert).toHaveBeenCalledWith('mock query', [
                'testUser',
                'password123',
                'server123',
            ])
        })

        it('should throw an error if insert fails', async () => {
            ;(insert as jest.Mock).mockRejectedValue(
                new Error('Database Error')
            )

            await expect(
                createLocalUser('testUser', 'password123')
            ).rejects.toThrow('Database Error')

            expect(insert).toHaveBeenCalled()
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
