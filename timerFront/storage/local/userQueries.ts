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
        console.log('errori in getUsers', error)
        throw new Error(
            `Database fetch failed: ${
                error instanceof Error ? error.message : String(error)
            }`
        )
    }
}

export { insertUser, getUsers }
