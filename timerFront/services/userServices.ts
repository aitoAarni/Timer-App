import { insert } from '@/storage/local/queryDatabase'
import {
    insertUserQuery,
    removeUserByUsername,
} from '@/storage/local/userQueries'
import { toRemoteUser } from '@/utils/validators'

export async function createLocalUser(
    username: string,
    password: string,
    server_id: string | null = null
) {
    try {
        await insert(insertUserQuery, [username, password, server_id])
    } catch (error) {
        console.error(error)
        throw new Error(error instanceof Error ? error.message : String(error))
    }
}

export async function removeLocalUser(username: string) {
    try {
        await removeUserByUsername(username)
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function createRemoteUser(username: String, password: string) {
    const body = JSON.stringify({ username, password })
    console.log('create a remote uesr')
    try {
        console.log('request body: ', body)
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
        console.log('request död, response: ', response.ok)
        if (!response.ok) {
            const errorText = await response.text()
            console.error(`Http: ${response.status}, ${errorText}`)
            return null
        }
        const responseJson = await response.json()
        console.log(responseJson)
        return responseJson
    } catch (error) {
        console.error(error instanceof Error ? error.message : String(error))
        throw error
    }
}

const createUser = async (username: string, password: string) => {
    let user_id: null | string = null
    try {
        const data = await createRemoteUser(username, password)
        const user = toRemoteUser(data)
        user_id = user.id
    } catch (error) {
        console.error(error)
        throw new Error(error instanceof Error ? error.message : String(error))
    } finally {
        await createLocalUser(username, password, user_id)
    }
}

export default createUser
