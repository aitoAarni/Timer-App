import { clearSettings, getSettings } from '@/services/settings'
import { createTables, initializeDatabase } from './db'
import { getUsers, insertUser } from './userQueries'
import { isTest } from '@/utils/environment'
import { clearUser } from '@/redux/userSlice'
import AuthStorage from '@/utils/authStorage'
import store from '@/redux/store'
import { updateSettings } from '@/redux/settingsSlice'

export default async function initializeStorage() {
    await initializeDatabase()
    await createTables()
    const users = await getUsers()

    if (users.length === 0) {
        await insertUser('test_user', 'password', null)
    }
    if (isTest()) {
        await clearSettings()
        const updatedSettings = await getSettings()
        store.dispatch(updateSettings(updatedSettings))
        const settings = await getSettings()
        console.log('settings: ', settings)
        const authStorage = new AuthStorage()
        await authStorage.removeUser()
        store.dispatch(clearUser())
    }
}
