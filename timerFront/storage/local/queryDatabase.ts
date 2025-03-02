import * as sqlite from 'expo-sqlite'
import { openDatabase } from './db'

const queryDatabase = async (
    query: string,
    values: (string | number | null)[] = []
) => {
    let db: sqlite.SQLiteDatabase | null = null
    try {
        db = await openDatabase()
        const response = await db.runAsync(query, values)
        return response
    } catch (error) {
        console.error('Database insert failed: ', error)
        throw new Error(error instanceof Error ? error.message : String(error))
    } finally {
        if (db) {
            db.closeAsync()
        }
    }
}

export default queryDatabase