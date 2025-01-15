import * as sqlite from 'expo-sqlite'

class TimeLogger {
    db: sqlite.SQLiteDatabase
    userId: number
    constructor(db: sqlite.SQLiteDatabase, userId: number) {
        this.db = db
        this.userId = userId
    }
}
