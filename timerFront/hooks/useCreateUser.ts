import { insertUser } from '@/storage/local/userQueries'

export default function useCreateUser() {
    const createUser = async (username: string, password: string) => {
        const server_id = 1 // add server id here when implemented
        try {
            await insertUser( username, password, server_id)
        } catch (error) {
            throw error
        }
    }
    return createUser
}
