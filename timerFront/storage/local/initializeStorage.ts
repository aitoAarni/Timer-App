import { clearSettings, getSettings } from '@/services/settingServices'
import { createTables, initializeDatabase } from './db'
import { BACK_END_URL, isTest } from '@/utils/environment'
import { clearUser } from '@/redux/userSlice'
import AuthStorage from '@/services/authStorageServices'
import store from '@/redux/store'
import { updateSettings } from '@/redux/settingsSlice'
import createUser, { createLocalUser } from '@/services/userServices'

export default async function initializeStorage() {
    await initializeDatabase()
    await createTables()

    if (isTest()) {
        await fetch(`${BACK_END_URL}/api/user/remove`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'Tech bro',
                password: 'secret password',
            }),
        })
        await fetch(`${BACK_END_URL}/api/user/remove`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'test_user',
                password: 'password',
            }),
        })
        await createUser('test_user', 'password')
        await clearSettings()
        const updatedSettings = await getSettings()
        store.dispatch(updateSettings(updatedSettings))
        const authStorage = new AuthStorage()
        await authStorage.removeUser()
        store.dispatch(clearUser())
    }
}
