import { User } from '@/types'
import * as sqlite from 'expo-sqlite'
import { openDatabase } from './db'

export const insertUserQuery = `INSERT INTO users (username, password, server_id) VALUES (?, ?, ?)`

export const getUsersQuery = 'SELECT * FROM users'

export const getUserByUsernameQuery = 'SELECT * FROM users WHERE username = ?;'



const removeUserByUsername = async (username: string) => {
    let db: sqlite.SQLiteDatabase | null = null
    try {
        db = await openDatabase()
        const query = 'DELETE FROM users WHERE username = ?;'
        await db.getFirstAsync(query, [username])
    } catch (error) {
        console.error(error)
        throw error
    } finally {
        if (db) {
            db.closeAsync()
        }
    }
}

export {  removeUserByUsername }
