import { insert, fetchOne, fetchAll } from '@/storage/local/queryDatabase'
import { openDatabase } from '@/storage/local/db'
import { SQLiteDatabase } from 'expo-sqlite'

jest.mock('@/storage/local/db', () => ({
    openDatabase: jest.fn(),
}))

describe('Database Query Functions', () => {
    let mockDb: jest.Mocked<SQLiteDatabase>

    beforeEach(async () => {
        mockDb = {
            runAsync: jest.fn().mockResolvedValue({ changes: 1 }),
            getFirstAsync: jest.fn().mockResolvedValue({ id: 1, name: 'Test' }),
            getAllAsync: jest.fn().mockResolvedValue([{ id: 1, name: 'Test' }]),
            closeAsync: jest.fn(),
        } as unknown as jest.Mocked<SQLiteDatabase>

        ;(openDatabase as jest.Mock).mockResolvedValue(mockDb)
    })

    test('insert should call runAsync with correct parameters', async () => {
        const query = 'INSERT INTO users (name) VALUES (?)'
        const values = ['Alice']

        await insert(query, values)

        expect(mockDb.runAsync).toHaveBeenCalledWith(query, values)
        expect(mockDb.closeAsync).toHaveBeenCalled()
    })

    test('fetchOne should call getFirstAsync with correct parameters', async () => {
        const query = 'SELECT * FROM users WHERE id = ?'
        const values = [1]

        const result = await fetchOne(query, values)

        expect(mockDb.getFirstAsync).toHaveBeenCalledWith(query, values)
        expect(result).toEqual({ id: 1, name: 'Test' })
        expect(mockDb.closeAsync).toHaveBeenCalled()
    })

    test('fetchAll should call getAllAsync with correct parameters', async () => {
        const query = 'SELECT * FROM users'
        const values: any[] = []

        const result = await fetchAll(query, values)

        expect(mockDb.getAllAsync).toHaveBeenCalledWith(query, values)
        expect(result).toEqual([{ id: 1, name: 'Test' }])
        expect(mockDb.closeAsync).toHaveBeenCalled()
    })

    test('insert should throw an error if runAsync fails', async () => {
        mockDb.runAsync.mockRejectedValue(new Error('DB error'))

        await expect(
            insert('INSERT INTO users (name) VALUES (?)', ['Alice'])
        ).rejects.toThrow('DB error')

        expect(mockDb.closeAsync).toHaveBeenCalled()
    })
})
