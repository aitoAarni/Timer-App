import store from '@/redux/store'
import {addLocalTimeLog, addRemoteTimeLog, getLocalTimeLogById} from '@/services/timeLogServices'
import { SQLiteRunResult } from 'expo-sqlite'

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
            const success = (await addLocalTimeLog(
                timeMs,
                this.categoryId,
                user.id
            ) ) as SQLiteRunResult
            if (user.server_id && user.token) {
                const timeLog = await getLocalTimeLogById(success.lastInsertRowId)
                const correctFormatCreatedAt = timeLog.created_at.split(' ')[0]
                await addRemoteTimeLog(
                    {
                        created_at: correctFormatCreatedAt,
                        duration: timeMs,
                        user_id: user.server_id,
                    },
                    user
                )
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
