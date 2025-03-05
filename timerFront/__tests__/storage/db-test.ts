import {
    openDatabase,
    initializeDatabase,
    createTables,
    dropUsersDatabase,
    dropTimerDatabase,
} from '@/storage/local/db'
import { isTest } from '@/utils/environment'
import * as sqlite from 'expo-sqlite'

// Mock dependencies
jest.mock('@/utils/environment', () => ({
    isTest: jest.fn(),
}))

jest.mock('expo-sqlite', () => ({
    openDatabaseAsync: jest.fn().mockResolvedValue({
        runAsync: jest.fn().mockResolvedValue(undefined),
        execAsync: jest.fn().mockResolvedValue(undefined),
        closeAsync: jest.fn().mockResolvedValue(undefined),
    }),
}))

describe('Database Functions', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('openDatabase should open correct database based on environment', async () => {
        ;(isTest as jest.Mock).mockReturnValue(true)
        await openDatabase()
        expect(sqlite.openDatabaseAsync).toHaveBeenCalledWith('testDatabase')
        ;(isTest as jest.Mock).mockReturnValue(false)
        await openDatabase()
        expect(sqlite.openDatabaseAsync).toHaveBeenCalledWith('localDatabase')
    })

    test('initializeDatabase should call drop tables if in test mode', async () => {
        ;(isTest as jest.Mock).mockReturnValue(true)

        const execAsyncSpy = jest.spyOn(
            await sqlite.openDatabaseAsync("testDatabase"),
            'execAsync'
        )
        await initializeDatabase()
        expect(execAsyncSpy).toHaveBeenNthCalledWith(1, "DROP TABLE IF EXISTS timer")
        expect(execAsyncSpy).toHaveBeenNthCalledWith(2, "DROP TABLE IF EXISTS users")
        execAsyncSpy.mockRestore()
    })

    test('createTables should create necessary tables', async () => {
        await createTables()
        const db = await openDatabase()

        expect(db.runAsync).toHaveBeenCalledTimes(2)
    })

    test('dropUsersDatabase should drop users table', async () => {
        await dropUsersDatabase()
        const db = await openDatabase()
        console.log("database: " , db)

        expect(db.execAsync).toHaveBeenCalledWith('DROP TABLE IF EXISTS users')
    })

    test('dropTimerDatabase should drop timer table', async () => {
        await dropTimerDatabase()
        const db = await openDatabase()

        expect(db.execAsync).toHaveBeenCalledWith('DROP TABLE IF EXISTS timer')
    })
})
