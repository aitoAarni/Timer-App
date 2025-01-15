import { TimeLogged } from '@/types'
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

const getAllTimes = async (db: sqlite.SQLiteDatabase) => {
    try {
        const times = (await db.getAllAsync(
            `SELECT * FROM timer`
        )) as TimeLogged[]
        return times
    } catch (error) {
        throw new Error(
            `Error fetching times: ${
                error instanceof Error ? error.message : String(error)
            }`
        )
    }
}

export { insertTime, getAllTimes }
