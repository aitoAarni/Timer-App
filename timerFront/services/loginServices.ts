import { BACK_END_URL } from '@/utils/environment'
import { toRemoteLoggedInUser } from '@/utils/validators'

export default async function remoteLogin(username: string, password: string) {
    const body = JSON.stringify({ username, password })
    try {
        const response = await fetch(`${BACK_END_URL}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        })
        if (!response.ok) {
            const errorText = await response.text()
            console.error(`Http: ${response.status}, ${errorText}`)
            return null
        }

        const json = toRemoteLoggedInUser(await response.json())
        return json
    } catch (error) {
        console.error(error instanceof Error ? error.message : String(error))
        throw error
    }
}
