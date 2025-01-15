import { initializeDatabase } from '@/storage/local/db'
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'
import * as sqlite from 'expo-sqlite'

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

    useEffect(() => {
        const startAndSetDatabase = async () => {
            try {
                const db = await initializeDatabase()
                setDatabase(db)
            } catch (error) {
                throw new Error(
                    `${error instanceof Error ? error.message : String(error)}`
                )
            }
        }
        startAndSetDatabase()
        return () => {
            if (database) {
                database.closeAsync()
            }
        }
    }, [])

    return (
        <DatabaseContext.Provider value={database}>
            {children}
        </DatabaseContext.Provider>
    )
}
