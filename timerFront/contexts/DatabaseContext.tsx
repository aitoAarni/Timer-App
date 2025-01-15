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
    const [isInitializing, setIsInitializing] = useState(true)
    console.log('1')
    useEffect(() => {
        const startAndSetDatabase = async () => {
            try {
                console.log('before awaiiiiit')
                const db = await initializeDatabase()
                console.log('after awaaaait')
                setDatabase(db)
                setIsInitializing(false)
            } catch (error) {
                throw new Error(
                    `${error instanceof Error ? error.message : String(error)}`
                )
            }
        }
        console.log('hereee12')
        startAndSetDatabase()
        console.log('db base 1: ', database)
        return () => {
            if (database) {
                console.log('closing db base noooooow')
                database.closeAsync()
            }
        }
    }, [])
    if (isInitializing) return null
    console.log('2', database)
    return (
        <DatabaseContext.Provider value={database}>
            {children}
        </DatabaseContext.Provider>
    )
}
