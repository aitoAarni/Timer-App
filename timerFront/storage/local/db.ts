import * as sqlite from 'expo-sqlite'

const initializeDatabase = async () => {
    const db = await sqlite.openDatabaseAsync('localDatabase')
    return db
}
const createTables = async (db: sqlite.SQLiteDatabase) => {
    try {
        await db.execAsync(`
            PRAGMA foreign_keys = ON;
            CREATE TABLE IF NOT EXISTS users 
            (id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS timer 
            (id INTEGER PRIMARY KEY AUTOINCREMENT, 
            category_id INTEGER NOT NULL,
            duration INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            user_id INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE);
            `)
    } catch (error) {
        throw new Error(
            `Databse table creation failed: ${
                error instanceof Error ? error.message : String(error)
            }`
        )
    }
}

const dropUsersDatabase = async (db: sqlite.SQLiteDatabase) => {
    await db.execAsync(`DELETE FROM users`)
}

const dropTimerDatabase = async (db: sqlite.SQLiteDatabase) => {
    await db.execAsync(`DELETE FROM users`)
}

export {
    initializeDatabase,
    createTables,
    dropUsersDatabase,
    dropTimerDatabase,
}
