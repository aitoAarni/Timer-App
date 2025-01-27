import {
    getSecureKeyValuePair,
    setSecureKeyValuePair,
} from '@/storage/local/secureKeyValueStorage'
import { User } from '@/types'

export default class AuthStorage {
    key: string
    constructor() {
        this.key = 'authUser'
    }
    async getUser() {
        try {
            const user = await getSecureKeyValuePair(this.key)
            return user
        } catch (error) {
            throw error
        }
    }
    async setUser(user: User) {
        const userString = JSON.stringify(user)
        try {
            await setSecureKeyValuePair(this.key, userString)
        } catch (error) {
            throw error
        }
    }
}
