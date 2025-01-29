import { DatesWithDuration, TimeDuratio, TimeLogged } from '@/types'
import * as sqlite from 'expo-sqlite'
import { getUsers } from './userQueries'

const insertTimeToDb = async (
    db: sqlite.SQLiteDatabase,
    duration: number,
    category_id: number,
    user_id: number
) => {
    try {
        const users = await getUsers(db)
        console.log('users', users)
        console.log('user_id', user_id)
        await db.runAsync(
            `INSERT INTO timer (duration, category_id, user_id) VALUES (?, ?, ?);`,
            [duration, category_id, user_id]
        )
        return true
    } catch (error) {
        console.error('insertTimeToDb', error)
        throw new Error(`Error inserting data: ${error}`)
    }
}

const getAllTimeData = async (db: sqlite.SQLiteDatabase) => {
    try {
        const timeData = (await db.getAllAsync(
            `SELECT * FROM timer`
        )) as TimeLogged[]
        return timeData
    } catch (error) {
        console.error('getAllTimesData', error)
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
        console.error('getAllTimes', error)
        throw new Error(
            `Error fetching times: ${
                error instanceof Error ? error.message : String(error)
            }`
        )
    }
}

const getTimesGroupedByDate = async (
    db: sqlite.SQLiteDatabase,
    userId: number
) => {
    const query = ` SELECT 
        DATE(created_at) AS date, 
        SUM(duration) AS total_duration
    FROM 
        timer
    WHERE
            user_id = ?
    GROUP BY 
        DATE(created_at)
    ORDER BY 
        DATE(created_at) DESC;`
    try {
        const data = (await db.getAllAsync(query, [
            userId,
        ])) as DatesWithDuration[]
        return data
    } catch (error) {
        console.error('getTimesGroupedByData', error)
        throw new Error(
            `Error fetching times: ${
                error instanceof Error ? error.message : String(error)
            }`
        )
    }
}

export { insertTimeToDb, getAllTimeData, getAllTimes, getTimesGroupedByDate }
