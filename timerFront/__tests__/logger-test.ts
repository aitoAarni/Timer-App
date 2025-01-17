// @ts-nocheck
import TimeLogger from '@/utils/logger'

const mockInsertTimeToDb = jest.fn().mockReturnValue(true)
jest.mock('@/storage/local/timerQueries', () => ({
    insertTimeToDb: (db, timeMs, categoryId, userId) => {
        return mockInsertTimeToDb(db, timeMs, categoryId, userId)
    },
}))

describe('logger', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    it('logs time', async () => {
        const mockDb = jest.fn()
        const logger = new TimeLogger(mockDb, 1, 1)
        const result = await logger.addTimeLog(10_000)
        expect(mockInsertTimeToDb).toHaveBeenCalledWith(mockDb, 10_000, 1, 1)
    })
})
