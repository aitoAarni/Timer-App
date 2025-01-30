import { isTest } from '@/utils/environment'
import * as sqlite from 'expo-sqlite'

const initializeDatabase = async () => {
    const databaseName = isTest() ? 'testDatabase' : 'localDatabase'
    const db = await sqlite.openDatabaseAsync(databaseName)
    await db.execAsync('PRAGMA foreign_keys = ON')
    if (isTest()) {
        await dropTimerDatabase(db)
        await dropUsersDatabase(db)
    }
    return db
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
        console.error('error in createTables', error)
        throw error
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
}
