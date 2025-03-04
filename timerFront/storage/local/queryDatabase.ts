import * as sqlite from 'expo-sqlite'
import { openDatabase } from './db'

const queryDatabase = async (
    query: string,
    values: (string | number | null)[] = [],
    getAllAsync = false
) => {
    let db: sqlite.SQLiteDatabase | null = null
    try {
        db = await openDatabase()
        let response: sqlite.SQLiteRunResult | unknown[]
        if (getAllAsync) {
            response = await db.getAllAsync(query, values)
        } else {
            response = await db.runAsync(query, values)
        }
        return response
    } catch (error) {
        console.error('Database query failed: ', error)
        throw new Error(error instanceof Error ? error.message : String(error))
    } finally {
        if (db) {
            db.closeAsync()
        }
    }
}

export default queryDatabase
