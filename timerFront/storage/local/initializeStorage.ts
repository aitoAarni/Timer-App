import { clearSettings } from '@/services/settings'
import { createTables, initializeDatabase } from './db'
import { getUsers, insertUser } from './userQueries'
import { isTest } from '@/utils/environment'

export default async function initializeStorage() {
    await initializeDatabase()
    await createTables()
    const users = await getUsers()

    if (users.length === 0) {
        await insertUser('test_user', 'password', 1)
    }
    if (isTest()) {
        await clearSettings()
    }
}
