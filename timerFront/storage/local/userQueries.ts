import { User } from '@/types'
import * as sqlite from 'expo-sqlite'

const insertUser = async (db: sqlite.SQLiteDatabase, username: string) => {
    try {
        await db.runAsync(`INSERT INTO users (username) VALUES (?)`, username)
    } catch (error) {
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
        throw new Error(
            `Database fetch failed: ${
                error instanceof Error ? error.message : String(error)
            }`
        )
    }
}

export { insertUser, getUsers }
