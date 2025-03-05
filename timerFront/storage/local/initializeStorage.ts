import { clearSettings, getSettings } from '@/services/settings'
import { createTables, initializeDatabase } from './db'
import { isTest } from '@/utils/environment'
import { clearUser } from '@/redux/userSlice'
import AuthStorage from '@/utils/authStorage'
import store from '@/redux/store'
import { updateSettings } from '@/redux/settingsSlice'
import { createLocalUser } from '@/services/userServices'

export default async function initializeStorage() {
    await initializeDatabase()

    await createTables()

    if (isTest()) {
        await createLocalUser('test_user', 'password', null)

        await clearSettings()
        const updatedSettings = await getSettings()
        store.dispatch(updateSettings(updatedSettings))
        const authStorage = new AuthStorage()
        await authStorage.removeUser()
        store.dispatch(clearUser())
    }
}
