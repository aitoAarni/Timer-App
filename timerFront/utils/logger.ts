import { insertTime } from '@/storage/local/timerQueries'
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
        const success = await insertTime(
            this.db,
            timeMs,
            this.categoryId,
            this.userId
        )
        return success
    }
}

export default TimeLogger
