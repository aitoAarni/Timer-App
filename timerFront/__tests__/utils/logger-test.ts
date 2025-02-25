// @ts-nocheck
import TimeLogger from '@/utils/logger'

const mockInsertTimeToDb = jest.fn().mockReturnValue(true)
const mockGetTimeById = jest
    .fn()
    .mockResolvedValue({ created_at: '2025-02-02 10:03:34' })
jest.mock('@/storage/local/timerQueries', () => ({
    insertTimeToDb: (timeMs, categoryId, userId) => {
        return mockInsertTimeToDb(timeMs, categoryId, userId)
    },
    getTimeById: (...args) => {
        return mockGetTimeById(...args)
    },
}))

jest.mock('@/redux/store', () => ({
    getState: jest.fn(() => ({
        user: {
            loggedInUser: {
                id: 1,
                token: 'Bearer 34242',
                server_id: 'serverId',
            },
        },
    })),
}))

jest.mock('@/storage/local/db', () => ({
    openDatabase: jest.fn(),
}))
const mockAddRemoteTimeLog = jest.fn().mockResolvedValue()

jest.mock('@/services/timeLogServices', () => {
    return (...args) => {
        return mockAddRemoteTimeLog(...args)
    }
})

describe('logger', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('logs when validt data and uesr is provided', async () => {
        const mockDb = jest.fn()
        const logger = new TimeLogger(1)
        await logger.addTimeLog(10_000)
        expect(mockInsertTimeToDb).toHaveBeenCalledWith(10_000, 1, 1)
        expect(mockAddRemoteTimeLog).toHaveBeenCalledWith(
            {
                created_at: '2025-02-02 10:03:34',
                duration: 10_000,
                user_id: 'serverId',
            },
            { id: 1, token: 'Bearer 34242', server_id: 'serverId' }
        )
    })
    
})
