import remoteLogin from '@/services/loginServices'
import { toRemoteLoggedInUser } from '@/utils/validators'

global.fetch = jest.fn()

jest.mock('@/utils/validators', () => ({
    toRemoteLoggedInUser: jest.fn(),
}))

jest.mock("@/utils/environment", () => ({
    BACK_END_URL: "http://192.168.1.120:3000"
}))

describe('remoteLogin', () => {
    const mockUser = {
        id: '123',
        username: 'testUser',
        token: 'validToken123',
        times: ['2024-02-22T10:00:00Z'],
    }
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

    it('should return a valid user object on successful login', async () => {
        ;(global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockUser),
        })
        ;(toRemoteLoggedInUser as jest.Mock).mockReturnValue(mockUser)
        const result = await remoteLogin('testUser', 'password123')

        expect(fetch).toHaveBeenCalledWith(
            'http://192.168.1.120:3000/api/user/login',
            expect.objectContaining({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: 'testUser',
                    password: 'password123',
                }),
            })
        )
        expect(toRemoteLoggedInUser).toHaveBeenCalledWith(mockUser)
        expect(result).toEqual(mockUser)
    })

    it('should return null if the API responds with an error', async () => {
        ;(global.fetch as jest.Mock).mockResolvedValue({
            ok: false,
            text: jest.fn().mockResolvedValue('Invalid credentials'),
        })

        const result = await remoteLogin('wrongUser', 'wrongPassword')

        expect(fetch).toHaveBeenCalled()
        expect(result).toBeNull()
    })

    it('should throw an error if the server is unreachable', async () => {
        ;(global.fetch as jest.Mock).mockRejectedValue(
            new Error('Network Error')
        )

        await expect(remoteLogin('testUser', 'password123')).rejects.toThrow(
            'Network Error'
        )

        expect(fetch).toHaveBeenCalled()
    })

    it('should throw an error if the response does not match the expected schema', async () => {
        ;(global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({ invalid: 'data' }),
        })
        ;(toRemoteLoggedInUser as jest.Mock).mockImplementation(() => {
            throw new Error('Validation Error')
        })

        await expect(remoteLogin('testUser', 'password123')).rejects.toThrow(
            'Validation Error'
        )

        expect(fetch).toHaveBeenCalled()
    })
})
