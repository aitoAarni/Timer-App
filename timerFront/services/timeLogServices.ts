import queryDatabase from '@/storage/local/queryDatabase'
import {
    insertTimeToDb,
    insertTimeToDbQuery,
} from '@/storage/local/timerQueries'
import { StorageUser } from '@/types'
import { toLocalTimeLog } from '@/utils/validators'

interface TimeLog {
    created_at: string
    duration: number
    user_id: string
}

export const addRemoteTimeLog = async (timeLog: TimeLog, user: StorageUser) => {
    const url = 'http://192.168.1.120:3000/api/timelog'
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
        const response = await queryDatabase(insertTimeToDbQuery, [
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
