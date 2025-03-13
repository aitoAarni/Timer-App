import * as sqlite from 'expo-sqlite'
import { openDatabase } from './db'

export const insert = async (
    query: string,
    values: (string | number | null)[] = []
) => {
    let db: sqlite.SQLiteDatabase | null = null
    try {
        db = await openDatabase()
        const response = await db.runAsync(query, values)
        return response
    } catch (error) {
        console.error('Database query failed: ', error)
        throw new Error(error instanceof Error ? error.message : String(error))
    } finally {
        if (db) {
            db.closeAsync()
        }
    }
}

export const fetchOne = async (
    query: string,
    values: (string | number | null)[] = []
) => {
    let db: sqlite.SQLiteDatabase | null = null
    try {
        db = await openDatabase()
        const response = await db.getFirstAsync(query, values)
        return response
    } catch (error) {
        console.error('Database query failed: ', error)
        throw new Error(error instanceof Error ? error.message : String(error))
    } finally {
        if (db) {
            db.closeAsync()
        }
    }
}

export const fetchAll = async (
    query: string,
    values: (string | number | null)[] = []
) => {
    let db: sqlite.SQLiteDatabase | null = null
    try {
        db = await openDatabase()
        const response = await db.getAllAsync(query, values)
        return response
    } catch (error) {
        console.error('Database query failed: ', error)
        throw new Error(error instanceof Error ? error.message : String(error))
    } finally {
        if (db) {
            db.closeAsync()
        }
    }
}
