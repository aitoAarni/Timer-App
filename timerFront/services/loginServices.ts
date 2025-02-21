import { toRemoteUser } from '@/utils/validators'

export default async function remoteLogin(username: string, password: string) {
    const body = JSON.stringify({ username, password })
    try {
        const response = await fetch(
            'http://192.168.1.120:3000/api/user/login',
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
        const json = toRemoteUser(await response.json())
        return json
    } catch (error) {
        console.error(error instanceof Error ? error.message : String(error))
        throw error
    }
}
