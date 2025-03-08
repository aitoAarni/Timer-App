// @ts-nocheck
import useLogIn from '@/hooks/useLogIn'
import { removeLocalUser } from '@/services/userServices'
import { getUserByUsernameQuery } from '@/storage/local/userQueries'

let mockGetUserByUsername: typeof jest.fn
jest.mock('@/storage/local/userQueries', () => ({
    getUserByUsernameQuery: 'mock query',
}))

let mockSetUser = jest.fn()
jest.mock('@/services/authStorageServices', () => {
    return jest.fn().mockImplementation(() => ({
        setUser: (...args: string[]) => {
            mockSetUser(...args)
        },
    }))
})
let mockSetLoggedInUser = jest.fn((...args) => {
    return { ...args }
})
jest.mock('@/redux/userSlice', () => ({
    setLoggedInUser: (...args: any) => {
        return mockSetLoggedInUser(...args)
    },
}))

let mockCreateLocalUser = jest.fn(() => {})
let mockCreateRemoteUser = jest.fn()
jest.mock('@/services/userServices', () => ({
    createLocalUser: (...args: []) => {
        return mockCreateLocalUser(...args)
    },
    createRemoteUser: (...args: []) => {
        return mockCreateRemoteUser(...args)
    },
    removeLocalUser: () => {
        jest.fn()
    },
    getLocalUserByUsername: (...args) => {
        return mockGetUserByUsername(...args)
    },
}))

let mockDispatch = jest.fn()

jest.mock('react-redux', () => ({
    useDispatch: () => {
        return mockDispatch
    },
}))

let mockLogin: jest.Mock

jest.mock('@/services/loginServices', () => {
    return (...args: any) => {
        return mockLogin(...args)
    }
})

describe('useLogIn hook', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockLogin = jest.fn((username, passowrd) => {
            return Promise.resolve({
                id: 'id123',
                username,
                token: 'token',
                times: [],
            })
        })
        mockGetUserByUsername = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                username: 'testUser',
                password: 'password123',
            })
        })
    })

    it('logs in with local and remote user', async () => {
        const logIn = useLogIn()
        const success = await logIn('testUser', 'password123')
        expect(success).toBeTruthy()
        expect(mockSetUser).toHaveBeenCalledWith({
            password: 'password123',
            token: 'Bearer token',
            username: 'testUser',
        })
        expect(mockDispatch).toHaveBeenCalledWith(
            mockSetLoggedInUser({
                username: 'testUser',
                password: 'password123',
                token: 'Bearer token',
            })
        )
    })

    it('logs in an existing local user with the correct password', async () => {
        mockLogin = jest.fn()
        const logIn = useLogIn()

        const success = await logIn('testUser', 'password123')

        expect(success).toBe(true)
        expect(mockSetUser).toHaveBeenCalledWith(
            expect.objectContaining({
                username: 'testUser',
                token: null,
            })
        )

        expect(mockDispatch).toHaveBeenCalledWith(
            mockSetLoggedInUser({
                username: 'testUser',
                password: 'password123',
                token: null,
            })
        )
    })

    it('logs in a remote user if not found locally', async () => {
        const logIn = useLogIn()

        const success = await logIn('testUser', 'newPassword123')

        expect(success).toBe(true)
        expect(mockCreateLocalUser).toHaveBeenCalledWith(
            'testUser',
            'newPassword123',
            'id123'
        )
        expect(mockSetUser).toHaveBeenCalledWith(
            expect.objectContaining({
                password: 'password123',
                token: 'Bearer token',
                username: 'testUser',
            })
        )
        expect(mockDispatch).toHaveBeenCalledWith(
            mockSetLoggedInUser({
                password: 'password123',
                token: 'Bearer token',
                username: 'testUser',
            })
        )
    })

    it('creates a remote user if remote login fails initially', async () => {
        mockLogin = jest
            .fn()
            .mockResolvedValueOnce(null) 
            .mockResolvedValueOnce({ id: 'remote123', token: 'abc123' }) 

        const logIn = useLogIn()

        const success = await logIn('testUser', 'password123')

        expect(success).toBe(true)
        expect(mockCreateRemoteUser).toHaveBeenCalledWith(
            'testUser',
            'password123'
        )
        expect(mockSetUser).toHaveBeenCalledWith(
            expect.objectContaining({
                username: 'testUser',
                password: 'password123',
                token: 'Bearer abc123',
            })
        )
        expect(mockDispatch).toHaveBeenCalledWith(
            mockSetLoggedInUser({
                username: 'testUser',
                password: 'password123',
                token: 'Bearer abc123',
            })
        )
    })

    it('fails login when credentials are incorrect', async () => {
        mockLogin = jest.fn().mockResolvedValue(null)
        mockGetUserByUsername = jest.fn().mockResolvedValue([])
        const logIn = useLogIn()

        const success = await logIn('testUser', 'password123')

        expect(success).toBe(false)
        expect(mockDispatch).not.toHaveBeenCalled()
    })
})
