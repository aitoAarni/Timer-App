import store from '@/redux/store'
import { insertTimeToDb } from '@/storage/local/timerQueries'

class TimeLogger {
    categoryId: number
    constructor(categoryId: number = 1) {
        this.categoryId = categoryId
    }
    async addTimeLog(timeMs: number) {
        const state = store.getState()
        const userId = state.user.loggedInUser?.id

        if (!userId) return false
        try {
            const success = await insertTimeToDb(
                timeMs,
                this.categoryId,
                userId
            )
            return success
        } catch (error) {
            console.error(error)
            throw new Error(
                `${error instanceof Error ? error.message : String(error)}`
            )
        }
    }
}

export default TimeLogger
