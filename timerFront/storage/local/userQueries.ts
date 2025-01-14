import * as sqlite from 'expo-sqlite'

const insertUser = async (db: sqlite.SQLiteDatabase, username: string) => {
    try {
        const result = await db.runAsync(
            `INSERT INTO users (username) VALUES (?), ${username}`
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
    const query = await db.getAllAsync('SELECT * FROM users')
    return query as object[]
}

export { insertUser, getUsers }
