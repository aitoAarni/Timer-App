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
            console.log("user: ", user)
            if (user.server_id && user.token) {
                const timeLog = await getTimeById(success.lastInsertRowId)
                const correctFormatCreatedAt = timeLog.created_at.split(' ')[0]
                console.log('sending log')
                await addRemoteTimeLog(
                    {
                        created_at: correctFormatCreatedAt,
                        duration: timeMs,
                        user_id: user.server_id,
                    },
                    user
                )
                console.log('log sent')
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
