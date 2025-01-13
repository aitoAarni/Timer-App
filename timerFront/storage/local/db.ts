import * as sqlite from 'expo-sqlite'

const db = sqlite.openDatabaseSync('db.testDB')

db.transaction(tx => {
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, count INT)'
    )
})
