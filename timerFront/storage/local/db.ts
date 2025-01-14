import * as sqlite from 'expo-sqlite'

let db: sqlite.SQLiteDatabase

const initializeDb = async () => {
    db = await sqlite.openDatabaseAsync('testDatabase')
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
        INSERT INTO test (value, intValue) VALUES ('test1', 123);
        INSERT INTO test (value, intValue) VALUES ('test2', 456);
        INSERT INTO test (value, intValue) VALUES ('test3', 789);
        `)
}

const querlyDb = async () => {
    const query = await db.getAllAsync('SELECT * FROM test')
    console.log(query)
}

export { querlyDb, initializeDb }
