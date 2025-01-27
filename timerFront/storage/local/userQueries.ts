import { User } from '@/types'
import * as sqlite from 'expo-sqlite'

const insertUser = async (
    db: sqlite.SQLiteDatabase,
    username: string,
    password: string,
    server_id: number
) => {
    try {
        await db.runAsync(
            `INSERT INTO users (username, password, server_id) VALUES (?, ?, ?)`,
            username,
            password,
            server_id
        )
    } catch (error) {
        console.log('errori in InsertUser', error)
        throw new Error(
            `Database insert failed: ${
                error instanceof Error ? error.message : String(error)
            } `
        )
    }
}

const getUsers = async (db: sqlite.SQLiteDatabase) => {
    try {
        const query = (await db.getAllAsync('SELECT * FROM users')) as User[]
        return query
    } catch (error) {
        console.error(error)
        throw error
    }
}

const getUserByUsername = async (db: sqlite.SQLiteDatabase, username: string) => {
    try {
        const query = (await db.getAllAsync('SELECT * FROM users WHERE username = ?', username)) as User[]
        return query
    } catch (error) {
        console.error(error)
        throw error
    };
    ;
    
}

export { insertUser, getUsers, getUserByUsername }
