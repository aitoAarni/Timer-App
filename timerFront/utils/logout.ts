import store from '@/redux/store'
import { clearUser } from '@/redux/userSlice'
import AuthStorage from './authStorage'

export default async function logout() {
    console.log(
        `User before: ${JSON.stringify(store.getState().user.loggedInUser)}`
    )
    const authStorage = new AuthStorage()
    await authStorage.removeUser()
    store.dispatch(clearUser())
    console.log(`User removed: ${store.getState().user.loggedInUser}`)
}
