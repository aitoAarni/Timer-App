// @ts-nocheck
import TimeLogger from '@/utils/logger'

const mockInsertTimeToDb = jest.fn().mockReturnValue(true)
jest.mock('@/storage/local/timerQueries', () => ({
    insertTimeToDb: (timeMs, categoryId, userId) => {
        return mockInsertTimeToDb(timeMs, categoryId, userId)
    },
}))

jest.mock('@/redux/store', () => ({
    getState: jest.fn(() => ({
        user: { loggedInUser: { id: 1 } },
    })),
}))

jest.mock('@/storage/local/db', () => ({
    openDatabase: jest.fn(),
}))

describe('logger', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    it('logs time', async () => {
        const mockDb = jest.fn()
        const logger = new TimeLogger(mockDb, 1)
        const result = await logger.addTimeLog(10_000)
        expect(mockInsertTimeToDb).toHaveBeenCalledWith(10_000, 1, 1)
    })
})
