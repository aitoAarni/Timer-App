import { useContext } from 'react'
import { DatabaseContext } from '@/contexts/DatabaseContext'

export const useDatabase = () => {
    const database = useContext(DatabaseContext)
    if (!database) {
        throw new Error('useDatabase must be used within DatabaseProvider')
    }
    return database
}
