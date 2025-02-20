import { User } from '@/types'
import * as sqlite from 'expo-sqlite'
import { openDatabase } from './db'

const insertUser = async (
    username: string,
    password: string | undefined,
    server_id: string | undefined
) => {
    let db: sqlite.SQLiteDatabase | null = null
    try {
        db = await openDatabase()
        await db.runAsync(
            `INSERT INTO users (username, password, server_id) VALUES (?, ?, ?)`,
            username,
            password ? password : null,
            server_id ? server_id : null
        )
    } catch (error) {
        console.error('errori in InsertUser', error)
        throw new Error(
            `Database insert failed: ${
                error instanceof Error ? error.message : String(error)
            } `
        )
    } finally {
        if (db) {
            db.closeAsync()
        }
    }
}

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
            'SELECT * FROM users WHERE username = ?',
            username
        )) as User[]
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

export { insertUser, getUsers, getUserByUsername }
