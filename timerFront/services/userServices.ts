import { insertUser } from '@/storage/local/userQueries'

export default async function createLocalUser(
    username: string,
    password: string | undefined,
    server_id: string | undefined = undefined
) {
    try {
        await insertUser(username, password, server_id)
    } catch (error) {
        console.error(error)
        throw error
    }
}
