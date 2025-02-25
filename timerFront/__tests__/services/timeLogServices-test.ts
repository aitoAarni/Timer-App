import addRemoteTimeLog from '@/services/timeLogServices'
import { StorageUser } from '@/types'

global.fetch = jest.fn()

describe('addRemoteTimeLog', () => {
    const validTimeLog = {
        created_at: '2025-02-24 14:30:45',
        duration: 3600,
        user_id: '67b628d7c22cdf7238ba76aa',
    }

    const validUser = {
        id: 1,
        token: 'Bearer validToken123',
        username: 'user',
        password: 'password',
        created_at: '2025-02-24 14:30:44',
        server_id: "serverid_1"
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should send a valid POST request and return response JSON', async () => {
        const mockResponse = { success: true, id: '12345' }

        ;(fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockResponse),
        })

        const response = await addRemoteTimeLog(validTimeLog, validUser)

        expect(fetch).toHaveBeenCalledWith(
            'http://192.168.1.120:3000/api/timelog',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: validUser.token,
                },
                body: JSON.stringify(validTimeLog),
            }
        )

        expect(response).toEqual(mockResponse)
    })

    it('should throw an error if the user token is missing', async () => {
        const invalidUser = { token: '' } as StorageUser

        await expect(
            addRemoteTimeLog(validTimeLog, invalidUser)
        ).rejects.toThrow('No user token in memory')

        expect(fetch).not.toHaveBeenCalled()
    })

    it('should throw an error if fetch fails (network error)', async () => {
        ;(fetch as jest.Mock).mockRejectedValue(
            new Error('Network request failed')
        )

        await expect(addRemoteTimeLog(validTimeLog, validUser)).rejects.toThrow(
            'Network request failed'
        )

        expect(fetch).toHaveBeenCalledTimes(1)
    })

    it('should throw an error if the API returns a non-200 response', async () => {
        ;(fetch as jest.Mock).mockResolvedValue({
            ok: false,
            status: 500,
            json: jest
                .fn()
                .mockResolvedValue({ error: 'Internal Server Error' }),
        })

        await expect(addRemoteTimeLog(validTimeLog, validUser)).rejects.toThrow(
            'HTTP error! Status: 500'
        )

        expect(fetch).toHaveBeenCalledTimes(1)
    })
})
