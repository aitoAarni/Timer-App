import { insertUser } from '@/storage/local/userQueries'
import { useDatabase } from './useDatabase'

export default function useCreateUser() {
    const createUser = async (username: string, password: string) => {
        const server_id = 1 // add server id here when implemented
        const db = useDatabase()
        await insertUser(db, username, password, server_id)
        

    }
}
