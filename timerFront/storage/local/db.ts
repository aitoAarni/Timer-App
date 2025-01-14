import * as sqlite from 'expo-sqlite'

let db: sqlite.SQLiteDatabase

const initializeDatabase = async () => {
    db = await sqlite.openDatabaseAsync('testDatabase')
}
const createTable = async () => {
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
        INSERT INTO test (value, intValue) VALUES ('test1', 123);
        INSERT INTO test (value, intValue) VALUES ('test2', 456);
        INSERT INTO test (value, intValue) VALUES ('test3', 789);
        `)
}

const cleanDatabase = async () => {
    await db.execAsync(`DELETE FROM test`)
}

const queryDatabase = async (): Promise<object[]> => {
    const query = await db.getAllAsync('SELECT * FROM test')
    return query as object[]
}

export { queryDatabase, initializeDatabase, createTable, cleanDatabase }
