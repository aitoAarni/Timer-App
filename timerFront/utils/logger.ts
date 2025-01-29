import store from '@/redux/store'
import { insertTimeToDb } from '@/storage/local/timerQueries'
import * as sqlite from 'expo-sqlite'

class TimeLogger {
    db: sqlite.SQLiteDatabase
    categoryId: number
    constructor(db: sqlite.SQLiteDatabase, categoryId: number = 1) {
        this.db = db
        this.categoryId = categoryId
    }
    async addTimeLog(timeMs: number) {
        const state = store.getState()
        const userId = state.user.loggedInUser?.id

        if (!userId) return false
        try {
            const success = await insertTimeToDb(
                this.db,
                timeMs,
                this.categoryId,
                userId
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
