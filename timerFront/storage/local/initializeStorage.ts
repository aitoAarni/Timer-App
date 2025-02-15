import { clearSettings } from '@/services/settings'
import { createTables, initializeDatabase } from './db'
import { getUsers, insertUser } from './userQueries'
import { isTest } from '@/utils/environment'
import { clearUser } from '@/redux/userSlice'
import AuthStorage from '@/utils/authStorage'
import store from '@/redux/store'

export default async function initializeStorage() {
    await initializeDatabase()
    await createTables()
    const users = await getUsers()

    if (users.length === 0) {
        await insertUser('test_user', 'password', 1)
    }
    if (isTest()) {
        await clearSettings()
        const authStorage = new AuthStorage()
        await authStorage.removeUser()
        store.dispatch(clearUser())
    }
}
