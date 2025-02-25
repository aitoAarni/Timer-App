import store from '@/redux/store'
import addRemoteTimeLog from '@/services/timeLogServices'
import { getTimeById, insertTimeToDb } from '@/storage/local/timerQueries'

class TimeLogger {
    categoryId: number
    constructor(categoryId: number = 1) {
        this.categoryId = categoryId
    }
    async addTimeLog(timeMs: number) {
        const state = store.getState()
        const user = state.user.loggedInUser

        if (!user) return
        try {
            const success = await insertTimeToDb(
                timeMs,
                this.categoryId,
                user.id
            )
            console.log('query: ', success.lastInsertRowId)
            if (user.server_id && user.token) {
                const timeLog = await getTimeById(success.lastInsertRowId)

                console.log('row: ', timeLog)
                const result = await addRemoteTimeLog(
                    {
                        created_at: timeLog.created_at,
                        duration: timeMs,
                        user_id: user.server_id,
                    },
                    user
                )
                console.log('web result: ', result)
            }
        } catch (error) {
            console.error(error)
            throw new Error(
                `${error instanceof Error ? error.message : String(error)}`
            )
        }
    }
}

export default TimeLogger
