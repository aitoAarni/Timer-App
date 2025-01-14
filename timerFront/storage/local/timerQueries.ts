import * as sqlite from 'expo-sqlite'

const insertTime = async (
    db: sqlite.SQLiteDatabase,
    duration: number,
    category_id: number
) => {
    try {
        await db.runAsync(
            `INSERT INTO timer (category_id, duration, user_id) VALUES (?, ?, ?)`,
            category_id,
            duration,
            1
        )
    } catch (error) {
        throw new Error(
            `Error inserting data: ${
                error instanceof Error ? error.message : String(error)
            }`
        )
    }
}

const getAllTimes = async (db: sqlite.SQLiteDatabase) => {
    await db.getAllAsync(`SELECT * FROM timer`)
}

export { insertTime, getAllTimes }
