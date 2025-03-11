import {
    addRemoteTimeLog,
    addLocalTimeLog,
    getLocalTimeLogsAfterDate,
    getLocalTimeLogById,
} from '@/services/timeLogServices'
import { StorageUser } from '@/types'
import { fetchAll, fetchOne, insert } from '@/storage/local/queryDatabase'
import {
    getTimeLogByIdQuery,
    getTimeLogsAfterDateQuery,
    insertTimeLogToDbQuery,
} from '@/storage/local/timerQueries'
import { toDisplayTimeLog, toLocalTimeLogSchema } from '@/utils/validators'

jest.mock('@/storage/local/queryDatabase', () => ({
    fetchAll: jest.fn(),
    fetchOne: jest.fn(),
    insert: jest.fn(),
}))

jest.mock('@/utils/validators', () => ({
    toDisplayTimeLog: jest.fn(param => {
        return param
    }),
    toLocalTimeLogSchema: jest.fn(params => {
        return params
    }),
}))

jest.mock("@/utils/environment", () => ({
    BACK_END_URL: "http://192.168.1.120:3000"
}))


global.fetch = jest.fn()

describe('Time Log Storage Functions', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
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
            server_id: 'serverid_1',
        }

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

            await expect(
                addRemoteTimeLog(validTimeLog, validUser)
            ).rejects.toThrow('Network request failed')

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

            await expect(
                addRemoteTimeLog(validTimeLog, validUser)
            ).rejects.toThrow('HTTP error! Status: 500')

            expect(fetch).toHaveBeenCalledTimes(1)
        })
    })

    describe('addLocalTimeLog', () => {
        it('should insert a time log and return response', async () => {
            ;(insert as jest.Mock).mockResolvedValue({ success: true })

            const result = await addLocalTimeLog(1200, 1, 1)

            expect(insert).toHaveBeenCalledWith(
                insertTimeLogToDbQuery,
                [1200, 1, 1]
            )
            expect(result).toEqual({ success: true })
        })

        it('should throw an error if insert fails', async () => {
            ;(insert as jest.Mock).mockRejectedValue(
                new Error('DB insert failed')
            )

            await expect(addLocalTimeLog(1200, 1, 1)).rejects.toThrow(
                'DB insert failed'
            )
        })
    })

    describe('getLocalTimeLogsAfterDate', () => {
        it('should fetch time logs and transform them', async () => {
            const mockLogs = [{ date: '2025-03-05', duration: 1200 }]
            ;(fetchAll as jest.Mock).mockResolvedValue(mockLogs)

            const result = await getLocalTimeLogsAfterDate(1, '2025-02-02')

            expect(fetchAll).toHaveBeenCalledWith(getTimeLogsAfterDateQuery, [
                1,
                '2025-02-02',
            ])
            expect(toDisplayTimeLog).toHaveBeenCalledWith(mockLogs)
            expect(result).toEqual(mockLogs)
        })

        it('should throw an error if fetchAll fails', async () => {
            ;(fetchAll as jest.Mock).mockRejectedValue(
                new Error('DB fetch failed')
            )

            await expect(getLocalTimeLogsAfterDate(1, '2025-02-02')).rejects.toThrow(
                'DB fetch failed'
            )
        })
    })

    describe('getLocalTimeLogById', () => {
        it('should fetch a single log and transform it', async () => {
            const mockLog = { id: 1, duration: 1200 }
            ;(fetchOne as jest.Mock).mockResolvedValue(mockLog)

            const result = await getLocalTimeLogById(1)

            expect(fetchOne).toHaveBeenCalledWith(getTimeLogByIdQuery, [1])
            expect(toLocalTimeLogSchema).toHaveBeenCalledWith(mockLog)
            expect(result).toEqual(mockLog)
        })

        it('should throw an error if fetchOne fails', async () => {
            ;(fetchOne as jest.Mock).mockRejectedValue(
                new Error('DB fetch failed')
            )

            await expect(getLocalTimeLogById(1)).rejects.toThrow(
                'DB fetch failed'
            )
        })
    })
})
