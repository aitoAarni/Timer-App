import * as sqlite from 'expo-sqlite'

const insertUser = async (db: sqlite.SQLiteDatabase, username: string) => {
    try {
        const result = await db.runAsync(
            `INSERT INTO users (username) VALUES (?)`,
            username
        )
        return result
    } catch (error) {
        throw new Error(
            `Database insert failed: ${
                error instanceof Error ? error.message : String(error)
            } `
        )
    }
}

const getUsers = async (db: sqlite.SQLiteDatabase): Promise<object[]> => {
    try {
        const query = await db.getAllAsync('SELECT * FROM users')
        return query as object[]
    } catch (error) {
        throw new Error(
            `Database fetch failed: ${
                error instanceof Error ? error.message : String(error)
            }`
        )
    }
}

export { insertUser, getUsers }
