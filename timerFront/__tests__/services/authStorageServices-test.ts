import AuthStorage from '@/services/authStorageServices'
import {
    getSecureKeyValuePair,
    removeSecureKeyValuePair,
    setSecureKeyValuePair,
} from '@/storage/local/secureKeyValueStorage'
import { toStorageUser } from '@/utils/validators'
import { StorageUser } from '@/types'

jest.mock('@/storage/local/secureKeyValueStorage', () => ({
    getSecureKeyValuePair: jest.fn(),
    setSecureKeyValuePair: jest.fn(),
    removeSecureKeyValuePair: jest.fn(),
}))
jest.mock('@/utils/validators', () => ({
    toStorageUser: jest.fn(),
}))

describe('AuthStorage', () => {
    let authStorage: AuthStorage
    const mockUser: StorageUser = {
        id: 1,
        username: 'testUser',
        password: 'password',
        server_id: 'serverId',
        created_at: '2025-02-25',
        token: 'Bearer token',
    }

    beforeEach(() => {
        authStorage = new AuthStorage()
        jest.clearAllMocks()
    })

    describe('getUser', () => {
        it('returns parsed user when valid data is found', async () => {
            const userString = JSON.stringify(mockUser)
            ;(getSecureKeyValuePair as jest.Mock).mockResolvedValue(userString)
            ;(toStorageUser as jest.Mock).mockReturnValue(mockUser)

            const result = await authStorage.getUser()

            expect(getSecureKeyValuePair).toHaveBeenCalledWith('authUser')
            expect(toStorageUser).toHaveBeenCalledWith(mockUser)
            expect(result).toEqual(mockUser)
        })

        it('returns null when no data is found', async () => {
            ;(getSecureKeyValuePair as jest.Mock).mockResolvedValue(null)

            const result = await authStorage.getUser()

            expect(getSecureKeyValuePair).toHaveBeenCalledWith('authUser')
            expect(result).toBeNull()
        })

        it('throws an error when getSecureKeyValuePair fails', async () => {
            const error = new Error('Storage error')
            ;(getSecureKeyValuePair as jest.Mock).mockRejectedValue(error)

            await expect(authStorage.getUser()).rejects.toThrow('Storage error')
        })
    })

    describe('setUser', () => {
        it('stores user data successfully', async () => {
            await authStorage.setUser(mockUser)

            expect(setSecureKeyValuePair).toHaveBeenCalledWith(
                'authUser',
                JSON.stringify(mockUser)
            )
        })

        it('throws an error if setSecureKeyValuePair fails', async () => {
            const error = new Error('Failed to save user')
            ;(setSecureKeyValuePair as jest.Mock).mockRejectedValue(error)

            await expect(authStorage.setUser(mockUser)).rejects.toThrow(
                'Failed to save user'
            )
        })
    })

    describe('removeUser', () => {
        it('removes user data successfully', async () => {
            await authStorage.removeUser()

            expect(removeSecureKeyValuePair).toHaveBeenCalledWith('authUser')
        })

        it('throws an error if removeSecureKeyValuePair fails', async () => {
            const error = new Error('Failed to remove user')
            ;(removeSecureKeyValuePair as jest.Mock).mockRejectedValue(error)

            await expect(authStorage.removeUser()).rejects.toThrow(
                'Failed to remove user'
            )
        })
    })
})
