import { isTest } from '@/utils/environment'
import * as sqlite from 'expo-sqlite'

const initializeDatabase = async () => {
    const databaseName = isTest() ? 'testDatabase' : 'localDatabase'
    console.log('isTest(): ', isTest(), databaseName)
    const db = await sqlite.openDatabaseAsync(databaseName)
    dropUsersDatabase(db)
    await db.execAsync('PRAGMA foreign_keys = ON')
    if (isTest()) {
        dropTimerDatabase(db)
        dropUsersDatabase(db)
    }
    return db
}

const logTableSchema = async (db: sqlite.SQLiteDatabase) => {
    const schema = await db.getAllAsync('PRAGMA table_info(timer)')
    console.log(schema)
}
const createTables = async (db: sqlite.SQLiteDatabase) => {
    try {
        await db.runAsync(`
            CREATE TABLE IF NOT EXISTS users 
            (id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT,
            server_id INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );`)
        await db.runAsync(`
            CREATE TABLE IF NOT EXISTS timer
            (id INTEGER PRIMARY KEY AUTOINCREMENT,
            category_id INTEGER NOT NULL,
            duration INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            user_id INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE);
            `)
    } catch (error) {
        console.log('error in createTables', error)
        throw new Error(
            `Databse table creation failed: ${
                error instanceof Error ? error.message : String(error)
            }`
        )
    }
}

const dropUsersDatabase = async (db: sqlite.SQLiteDatabase) => {
    await db.execAsync(`DROP TABLE IF EXISTS users`)
}

const dropTimerDatabase = async (db: sqlite.SQLiteDatabase) => {
    await db.execAsync(`DROP TABLE IF EXISTS timer`)
}

export {
    initializeDatabase,
    createTables,
    dropUsersDatabase,
    dropTimerDatabase,
    logTableSchema,
}
