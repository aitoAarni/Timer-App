import { createTables, initializeDatabase } from '@/storage/local/db'
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'
import * as sqlite from 'expo-sqlite'
import { getUsers, insertUser } from '@/storage/local/userQueries'

export const DatabaseContext = createContext<sqlite.SQLiteDatabase | null>(null)


interface DatabaseProviderProps {
    children: ReactNode
}

export const DatabaseProvider = ({ children }: DatabaseProviderProps) => {
    const [database, setDatabase] = useState<sqlite.SQLiteDatabase | null>(null)
    const [isInitializing, setIsInitializing] = useState(true)
    useEffect(() => {
        const startAndSetDatabase = async () => {
            try {
                const db = await initializeDatabase()
                setDatabase(db)
                await createTables(db)
                const users = await getUsers(db)

                if (users.length === 0) {
                    await insertUser(db, 'lil bro', 'lil_hashh', 1)
                }
                setIsInitializing(false)
            } catch (error) {
                console.error('databaseProvider', error)
                throw new Error(
                    `${error instanceof Error ? error.message : String(error)}`
                )
            }
        }
        startAndSetDatabase()
        return () => {
            if (database) {
                console.log('closing the database')
                database.closeAsync()
            }
        }
    }, [])
    if (isInitializing) return null
    return (
        <DatabaseContext.Provider value={database}>
            {children}
        </DatabaseContext.Provider>
    )
}
