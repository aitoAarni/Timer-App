import { TimeDuratio, TimeLogged } from '@/types'
import * as sqlite from 'expo-sqlite'

const insertTime = async (
    db: sqlite.SQLiteDatabase,
    duration: number,
    category_id: number,
    user_id: number
) => {
    try {
        await db.runAsync(
            `INSERT INTO timer (duration, category_id, user_id) VALUES (?, ?, ?);`,
            [duration, category_id, user_id]
        )
        return true
    } catch (error) {
        throw new Error(
            `Error inserting data: ${
                error instanceof Error ? error.message : String(error)
            }`
        )
    }
}

const getAllTimeData = async (db: sqlite.SQLiteDatabase) => {
    try {
        const timeData = (await db.getAllAsync(
            `SELECT * FROM timer`
        )) as TimeLogged[]
        return timeData
    } catch (error) {
        throw new Error(
            `Error fetching time data: ${
                error instanceof Error ? error.message : String(error)
            }`
        )
    }
}

const getAllTimes = async (db: sqlite.SQLiteDatabase) => {
    const query = `SELECT duration FROM timer`
    try {
        const times = (await db.getAllAsync(query)) as TimeDuratio[]
        return times
    } catch (error) {
        throw new Error(
            `Error fetching times: ${
                error instanceof Error ? error.message : String(error)
            }`
        )
    }
}

export { insertTime, getAllTimeData, getAllTimes }
