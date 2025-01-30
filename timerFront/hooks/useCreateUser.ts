import { insertUser } from '@/storage/local/userQueries'
import { useDatabase } from './useDatabase'

export default function useCreateUser() {
    const db = useDatabase()
    const createUser = async (username: string, password: string) => {
        const server_id = 1 // add server id here when implemented
        try {
            await insertUser(db, username, password, server_id)
        } catch (error) {
            throw error
        }
    }
    return createUser
}
