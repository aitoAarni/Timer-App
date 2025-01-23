import { insertTimeToDb } from '@/storage/local/timerQueries'
import * as sqlite from 'expo-sqlite'

class TimeLogger {
    db: sqlite.SQLiteDatabase
    userId: number
    categoryId: number
    constructor(
        db: sqlite.SQLiteDatabase,
        userId: number,
        categoryId: number = 1
    ) {
        this.db = db
        this.userId = userId
        this.categoryId = categoryId
    }
    async addTimeLog(timeMs: number) {
        try {
            const success = await insertTimeToDb(
                this.db,
                timeMs,
                this.categoryId,
                this.userId
            )
            return success
        } catch (error) {
            console.log('errori addTimeLog')
            throw new Error(
                `${error instanceof Error ? error.message : String(error)}`
            )
        }
    }
}

export default TimeLogger
