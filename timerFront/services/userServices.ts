import { insertUser } from '@/storage/local/userQueries'

export async function createLocalUser(
    username: string,
    password: string | undefined,
    server_id: string | null = null
) {
    try {
        await insertUser(username, password, server_id)
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function createRemoteUser(username: String, password: string) {
    const body = JSON.stringify({ username, password })
    try {
        const response = await fetch(
            'http://192.168.1.120:3000/api/user/create',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }
        )
        if (!response.ok) {
            const errorText = await response.text()
            console.error(`Http: ${response.status}, ${errorText}`)
            return null
        }
        const api = await response.json()
        return api
    } catch (error) {
        console.error(error instanceof Error ? error.message : String(error))
        throw error
    }
}
