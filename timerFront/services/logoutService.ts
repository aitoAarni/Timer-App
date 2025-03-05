import store from '@/redux/store'
import { clearUser } from '@/redux/userSlice'
import AuthStorage from './authStorageServices'

export default async function logout() {
    const authStorage = new AuthStorage()
    await authStorage.removeUser()
    store.dispatch(clearUser())
}
