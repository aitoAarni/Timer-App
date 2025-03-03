import { DatesWithDuration, TimeDuratio, TimeLogged } from '@/types'
import * as sqlite from 'expo-sqlite'
import { openDatabase } from './db'

export const insertTimeToDbQuery = `INSERT INTO timer (duration, category_id, user_id) VALUES (?, ?, ?);`


const getAllTimes = async () => {
    const query = `SELECT duration FROM timer`
    let db: sqlite.SQLiteDatabase | null = null

    try {
        db = await openDatabase()
        const times = (await db.getAllAsync(query)) as TimeDuratio[]
        return times
    } catch (error) {
        console.error('getAllTimes', error)
        throw new Error(
            `Error fetching times: ${
                error instanceof Error ? error.message : String(error)
            }`
        )
    } finally {
        if (db) {
            db.closeAsync()
        }
    }
}

const getTimesGroupedByDate = async (userId: number) => {
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
    let db: sqlite.SQLiteDatabase | null = null

    try {
        db = await openDatabase()
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
    } finally {
        if (db) {
            db.closeAsync()
        }
    }
}

const getTimeById = async (rowId: number) => {
    const query = 'SELECT * FROM timer WHERE id = ?;'
    let db: sqlite.SQLiteDatabase | null = null
    try {
        db = await openDatabase()
        const result = (await db.getFirstAsync(query, [rowId])) as TimeLogged
        return result
    } catch (error) {
        console.error('getTimesGroupedByData', error)
        throw new Error(
            `Error fetching times: ${
                error instanceof Error ? error.message : String(error)
            }`
        )
    } finally {
        if (db) {
            db.closeAsync()
        }
    }
}

export {  getAllTimes, getTimesGroupedByDate, getTimeById }
