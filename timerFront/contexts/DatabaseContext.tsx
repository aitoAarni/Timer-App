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

const DatabaseContext = createContext<sqlite.SQLiteDatabase | null>(null)

export const useDatabase = () => {
    const database = useContext(DatabaseContext)
    if (!database) {
        throw new Error('useDatabase must be used within DatabaseProvider')
    }
    return database
}

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
                createTables(db)
                const users = await getUsers(db)
                if (!users) {
                    await insertUser(db, 'lil bro')
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
        console.log('clsoing the database')
        return () => {
            if (database) {
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
