import { fetchAll, fetchOne, insert } from '@/storage/local/queryDatabase'
import {
    getUserByUsernameQuery,
    getUsersQuery,
    insertUserQuery,
    removeUserByUsernameQuery,
} from '@/storage/local/userQueries'
import {
    toLocalDatabaseUser,
    toLocalDatabaseUsers,
    toRemoteUser,
} from '@/utils/validators'

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

export const getLocalUsers = async () => {
    try {
        const response = await fetchAll(getUsersQuery)

        return toLocalDatabaseUsers(response)
    } catch (error) {
        console.error(error)
        throw new Error(error instanceof Error ? error.message : String(Error))
    }
}

export const getLocalUserByUsername = async (username: string) => {
    try {
        const response = await fetchOne(getUserByUsernameQuery, [username])
        return toLocalDatabaseUser(response)
    } catch (error) {
        console.error(error instanceof Error ? error.message : String(error))
        return null
    }
}

export async function removeLocalUser(username: string) {
    try {
        await fetchOne(removeUserByUsernameQuery, [username])
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
        const responseJson = await response.json()
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
