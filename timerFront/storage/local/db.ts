import { isTest } from '@/utils/environment'
import * as sqlite from 'expo-sqlite'

const openDatabase = async () => {
    const databaseName = isTest() ? 'testDatabase' : 'localDatabase'
    const database = await sqlite.openDatabaseAsync(databaseName)
    return database
}

const initializeDatabase = async () => {
    if (isTest()) {
        await dropTimerDatabase()
        await dropUsersDatabase()
    }
}

const createTables = async () => {
    let db: sqlite.SQLiteDatabase | null = null

    try {
        db = await openDatabase()
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
    } finally {
        if (db) {
            db.closeAsync()
        }
    }
}

const dropUsersDatabase = async () => {
    const db = await openDatabase()
    await db.execAsync(`DROP TABLE IF EXISTS users`)
    db.closeAsync()
}

const dropTimerDatabase = async () => {
    const db = await openDatabase()
    await db.execAsync(`DROP TABLE IF EXISTS timer`)
    if (db) {
        db.closeAsync()
    }
}

export {
    openDatabase,
    initializeDatabase,
    createTables,
    dropUsersDatabase,
    dropTimerDatabase,
}
