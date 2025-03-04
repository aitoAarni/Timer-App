// @ts-nocheck
import { addLocalTimeLog } from '@/services/timeLogServices'
import TimeLogger from '@/utils/logger'
import { AppRegistry } from 'react-native'

const mockInsertTimeToDb = jest.fn().mockResolvedValue({ lastInsertRowId: 123 })
const mockGetLocalTimeLogById = jest.fn().mockResolvedValue({
    created_at: '2025-02-02 10:03:34',
})

const mockAddRemoteTimeLog = jest.fn().mockResolvedValue()
jest.mock('@/services/timeLogServices', () => ({
    addRemoteTimeLog: (...args) => {
        return mockAddRemoteTimeLog(...args)
    },
    addLocalTimeLog: (...args) => {
        return mockInsertTimeToDb(...args)
    },
    getLocalTimeLogById: (...args) => {
        return mockGetLocalTimeLogById(...args)
    },
}))
let mockLoggedInUser = {
    id: 1,
    token: 'Bearer 34242',
    server_id: 'serverId',
}
jest.mock('@/redux/store', () => ({
    getState: jest.fn(() => ({
        user: {
            loggedInUser: mockLoggedInUser,
        },
    })),
}))

jest.mock('@/storage/local/db', () => ({
    openDatabase: jest.fn(),
}))

describe('TimeLogger', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockLoggedInUser = {
            id: 1,
            token: 'Bearer 34242',
            server_id: 'serverId',
        }
    })

    it('logs time successfully when user is logged in and has a server_id', async () => {
        const logger = new TimeLogger(1)
        await logger.addTimeLog(10_000)

        expect(mockInsertTimeToDb).toHaveBeenCalledWith(10_000, 1, 1)
        expect(mockGetLocalTimeLogById).toHaveBeenCalledWith(123)
        expect(mockAddRemoteTimeLog).toHaveBeenCalledWith(
            {
                created_at: '2025-02-02',
                duration: 10_000,
                user_id: 'serverId',
            },
            { id: 1, token: 'Bearer 34242', server_id: 'serverId' }
        )
    })

    it('should not log time if user is missing', async () => {
        mockLoggedInUser = null

        const logger = new TimeLogger(1)
        await logger.addTimeLog(10_000)

        expect(mockInsertTimeToDb).not.toHaveBeenCalled()
        expect(mockAddRemoteTimeLog).not.toHaveBeenCalled()
    })

    it('should not send time to remote server if user has no server_id', async () => {
        delete mockLoggedInUser.server_id
        const logger = new TimeLogger(1)
        await logger.addTimeLog(10_000)

        expect(mockInsertTimeToDb).toHaveBeenCalled()
        expect(mockAddRemoteTimeLog).not.toHaveBeenCalled()
    })

    it('should handle database insert errors gracefully', async () => {
        mockInsertTimeToDb.mockRejectedValue(new Error('DB insert failed'))

        const logger = new TimeLogger(1)

        await expect(logger.addTimeLog(10_000)).rejects.toThrow(
            'DB insert failed'
        )

        expect(mockGetLocalTimeLogById).not.toHaveBeenCalled()
        expect(mockAddRemoteTimeLog).not.toHaveBeenCalled()
    })

    it('should handle API call errors gracefully', async () => {
        mockAddRemoteTimeLog.mockRejectedValue(new Error('API call failed'))

        const logger = new TimeLogger(1)

        await expect(logger.addTimeLog(10_000)).rejects.toThrow(
            'DB insert failed'
        )

        expect(mockInsertTimeToDb).toHaveBeenCalled()
        expect(mockGetLocalTimeLogById).not.toHaveBeenCalled()
    })
})
