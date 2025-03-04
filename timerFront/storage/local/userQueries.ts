import { User } from '@/types'
import * as sqlite from 'expo-sqlite'
import { openDatabase } from './db'

export const insertUserQuery = `INSERT INTO users (username, password, server_id) VALUES (?, ?, ?)`



const getUsers = async () => {
    let db: sqlite.SQLiteDatabase | null = null
    try {
        db = await openDatabase()
        const query = (await db.getAllAsync('SELECT * FROM users')) as User[]
        return query
    } catch (error) {
        console.error(error)
        throw error
    } finally {
        if (db) {
            db.closeAsync()
        }
    }
}

const getUserByUsername = async (username: string) => {
    let db: sqlite.SQLiteDatabase | null = null

    try {
        db = await openDatabase()
        const query = (await db.getAllAsync(
            'SELECT * FROM users WHERE username = ?;',
            username
        )) as User[]
        console.log('user query', query)
        return query
    } catch (error) {
        console.error(error)
        throw error
    } finally {
        if (db) {
            db.closeAsync()
        }
    }
}

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

export {  getUsers, getUserByUsername, removeUserByUsername }
