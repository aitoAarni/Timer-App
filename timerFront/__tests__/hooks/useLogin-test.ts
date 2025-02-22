import AuthStorage from '@/utils/authStorage'
import { setLoggedInUser } from '@/redux/userSlice'
import useLogIn from '@/hooks/useLogIn'
import { useInteropClassName } from 'expo-router/build/link/useLinkHooks'

jest.mock('@/storage/local/userQueries', () => ({
    getUserByUsername: jest.fn().mockImplementation(() => {
        console.log('täällääääää')
        return Promise.resolve([
            { username: 'testUser', password: 'password123' },
        ])
    }),
}))

let mockSetUser = jest.fn()
jest.mock('@/utils/authStorage', () => {
    return jest.fn().mockImplementation(() => ({
        setUser: (...args: string[]) => {
            console.log('jamaal ayooo')
            mockSetUser(...args)
        },
    }))
})
let mockSetLoggedInUser = jest.fn((...args) => {
    return { ...args }
})
jest.mock('@/redux/userSlice', () => ({
    setLoggedInUser: (...args) => {
        return mockSetLoggedInUser(...args)
    },
}))

let mockCreateLocalUser = jest.fn(() => {
    console.log('mockCreateLocalUser has been calld yo')
})
let mockCreateRemoteUser = jest.fn()
jest.mock('@/services/userServices', () => ({
    createLocalUser: (...args) => {
        return mockCreateLocalUser(...args)
    },
    createRemoteUser: () => {
        return mockCreateRemoteUser()
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
    return (...args) => {
        return mockLogin(...args)
    }
})

describe('useLogIn hook', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockLogin = jest.fn((username, passowrd) => {
            console.log('login called with, ', username, passowrd)
            return Promise.resolve({
                id: 'id123',
                username,
                token: 'token',
                times: [],
            })
        })
        // ;(useDispatch as jest.Mock).mockReturnValue(dispatchMock)
    })

    it.only('logs in an existing local user with the correct password', async () => {
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

    it.only('logs in a remote user if not found locally', async () => {
  
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
                token: 'token',
                username: 'testUser',
            })
        )
        expect(mockDispatch).toHaveBeenCalledWith(
            mockSetLoggedInUser({
                password: 'password123',
                token: 'token',
                username: 'testUser',
            })
        )
    })

    it('creates a remote user if login fails initially', async () => {
        // ;(getUserByUsername as jest.Mock).mockResolvedValue([
        //     { username: 'testUser', password: 'password123' },
        // ])
        ;(login as jest.Mock)
            .mockRejectedValueOnce(new Error('Network Error')) // First attempt fails
            .mockResolvedValueOnce({ id: 'remote123', token: 'abc123' }) // Second attempt succeeds

        const authStorageInstance = new AuthStorage()
        const logIn = useLogIn()

        const success = await logIn('testUser', 'password123')

        expect(success).toBe(true)
        expect(createRemoteUser).toHaveBeenCalledWith('testUser', 'password123')
        expect(authStorageInstance.setUser).toHaveBeenCalledWith(
            expect.objectContaining({
                username: 'testUser',
                token: 'abc123',
            })
        )
        expect(dispatchMock).toHaveBeenCalledWith(
            setLoggedInUser(expect.any(Object))
        )
    })

    it('fails login when credentials are incorrect', async () => {
        // ;(getUserByUsername as jest.Mock).mockResolvedValue([
        //     { username: 'testUser', password: 'wrongPassword' },
        // ])
        const logIn = useLogIn()

        const success = await logIn('testUser', 'password123')

        expect(success).toBe(false)
        expect(dispatchMock).not.toHaveBeenCalled()
    })

    it('handles network errors gracefully', async () => {
        // ;(getUserByUsername as jest.Mock).mockResolvedValue([])
        ;(login as jest.Mock).mockRejectedValue(new Error('Network Error'))

        console.error = jest.fn() // Suppress console error logs for test clarity

        const logIn = useLogIn()

        const success = await logIn('testUser', 'password123')

        expect(success).toBe(false)
        expect(console.error).toHaveBeenCalledWith('Network Error')
    })
})
