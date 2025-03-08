import { fetchAll, fetchOne, insert } from '@/storage/local/queryDatabase'
import {
    getTimeLogByIdQuery,
    getTimeLogsGroupedByDateQuery,
    insertTimeLogToDbQuery,
} from '@/storage/local/timerQueries'
import { StorageUser } from '@/types'
import { BACK_END_URL } from '@/utils/environment'
import { toDisplayTimeLog, toLocalTimeLogSchema } from '@/utils/validators'

interface TimeLog {
    created_at: string
    duration: number
    user_id: string
}

export const addRemoteTimeLog = async (timeLog: TimeLog, user: StorageUser) => {
    const url = `${BACK_END_URL}/api/timelog`
    const body = JSON.stringify(timeLog)
    if (!user.token) {
        throw new Error('No user token in memory')
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: user.token,
        },
        body,
    })
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return await response.json()
}

export const addLocalTimeLog = async (
    duration: number,
    category_id: number,
    user_id: number
) => {
    try {
        const response = await insert(insertTimeLogToDbQuery, [
            duration,
            category_id,
            user_id,
        ])
        return response
    } catch (error) {
        console.error(error)
        throw Error(error instanceof Error ? error.message : String(error))
    }
}

export const getLocalTimeLogs = async (localUserId: number) => {
    try {
        const response = await fetchAll(getTimeLogsGroupedByDateQuery, [
            localUserId,
        ])
        const displayTimeLogs = toDisplayTimeLog(response)
        return displayTimeLogs
    } catch (error) {
        console.error(error)
        throw new Error(error instanceof Error ? error.message : String(error))
    }
}

export const getLocalTimeLogById = async (rowId: number) => {
    try {
        const response = await fetchOne(getTimeLogByIdQuery, [rowId])
        return toLocalTimeLogSchema(response)
    } catch (error) {
        console.error(error)
        throw new Error(error instanceof Error ? error.message : String(error))
    }
}
