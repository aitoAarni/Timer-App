import { insertUser } from '@/storage/local/userQueries'
import { useDatabase } from './useDatabase'

export default function useCreateUser() {
    console.log('1')
    const db = useDatabase()
    const createUser = async (username: string, password: string) => {
        console.log('2')
        const server_id = 1 // add server id here when implemented
        console.log('3')
        try {
            await insertUser(db, username, password, server_id)
            console.log('4')
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    return createUser
}
