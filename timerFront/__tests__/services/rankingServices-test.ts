import { getRankings } from '@/services/rankingServices'
import store from '@/redux/store'

jest.mock('@/redux/store', () => ({
    getState: jest.fn(),
}))

jest.mock("@/utils/environment", () => ({
    BACK_END_URL: "http://192.168.1.120:3000"
}))


describe('getRankings', () => {
    const userId = '123'
    const date = '2024-02-28'
    const mockUrl = `http://192.168.1.120:3000/api/ranking/${date}/${userId}`

    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('should return rankings when the request is successful', async () => {
        const mockToken = 'valid-token'
        const mockData = { ranking: [{ userId: '123', score: 100 }] }

        ;(store.getState as jest.Mock).mockReturnValue({
            user: { loggedInUser: { token: mockToken } },
        })

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockData),
        })

        const result = await getRankings(userId, date)

        expect(fetch).toHaveBeenCalledWith(mockUrl, {
            method: 'GET',
            headers: { Authorization: mockToken },
        })
        expect(result).toEqual(mockData)
    })

    it('should return null if the user is not authenticated', async () => {
        ;(store.getState as jest.Mock).mockReturnValue({
            user: { loggedInUser: null },
        })

        const result = await getRankings(userId, date)

        expect(fetch).not.toHaveBeenCalled()
        expect(result).toBeNull()
    })

    it('should return null if the API returns an error response', async () => {
        const mockToken = 'valid-token'

        ;(store.getState as jest.Mock).mockReturnValue({
            user: { loggedInUser: { token: mockToken } },
        })

        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            json: jest.fn().mockResolvedValue({ error: 'Server error' }),
        })

        const result = await getRankings(userId, date)

        expect(fetch).toHaveBeenCalledWith(mockUrl, {
            method: 'GET',
            headers: { Authorization: mockToken },
        })
        expect(result).toBeNull()
    })

    it('should throw an error if fetch fails', async () => {
        const mockToken = 'valid-token'

        ;(store.getState as jest.Mock).mockReturnValue({
            user: { loggedInUser: { token: mockToken } },
        })

        global.fetch = jest.fn().mockRejectedValue(new Error('Network error'))

        await expect(getRankings(userId, date)).rejects.toThrow('Network error')

        expect(fetch).toHaveBeenCalledWith(mockUrl, {
            method: 'GET',
            headers: { Authorization: mockToken },
        })
    })
})
