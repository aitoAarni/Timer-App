import AuthStorage from '@/utils/authStorage'
import { setLoggedInUser } from '@/redux/userSlice'
import login from '@/services/loginServices'
import { createLocalUser, createRemoteUser } from '@/services/userServices'
import useLogIn from '@/hooks/useLogIn'

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
let mockSetLoggedInUser = jest.fn()
jest.mock('@/redux/userSlice', () => ({
    setLoggedInUser: () => {
        mockSetLoggedInUser()
    },
}))

jest.mock('@/services/loginServices', () => jest.fn())

jest.mock('@/services/userServices', () => ({
    createLocalUser: jest.fn(),
    createRemoteUser: jest.fn(),
}))

let mockDispatch = jest.fn()

jest.mock('react-redux', () => ({
    useDispatch: () => {
        return mockDispatch
    },
}))

describe('useLogIn hook', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        // ;(useDispatch as jest.Mock).mockReturnValue(dispatchMock)
    })

    it.only('logs in an existing local user with the correct password', async () => {
        // ;(getUserByUsername as jest.Mock).mockResolvedValue()
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
        // ;(getUserByUsername as jest.Mock).mockResolvedValue([])
        ;(login as jest.Mock).mockResolvedValue({
            id: 'remote123',
            token: 'abc123',
        })
        const authStorageInstance = new AuthStorage()
        const logIn = useLogIn()

        const success = await logIn('testUser', 'password123')

        expect(success).toBe(true)
        expect(createLocalUser).toHaveBeenCalledWith(
            'testUser',
            'password123',
            'remote123'
        )
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
