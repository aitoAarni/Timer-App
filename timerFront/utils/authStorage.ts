import {
    getSecureKeyValuePair,
    removeSecureKeyValuePair,
    setSecureKeyValuePair,
} from '@/storage/local/secureKeyValueStorage'
import { StorageUser, User } from '@/types'
import { toStorageUser } from './validators'

export default class AuthStorage {
    key: string
    constructor() {
        this.key = 'authUser'
    }
    async getUser() {
        try {
            const user = await getSecureKeyValuePair(this.key)
            if (typeof user === 'string') return toStorageUser(JSON.parse(user))
            return null
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async setUser(user: StorageUser) {
        const userString = JSON.stringify(user)
        try {
            await setSecureKeyValuePair(this.key, userString)
        } catch (error) {
            throw error
        }
    }
    async removeUser() {
        try {
            await removeSecureKeyValuePair(this.key)
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}
