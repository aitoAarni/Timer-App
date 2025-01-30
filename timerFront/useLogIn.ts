import { useDatabase } from './hooks/useDatabase'
import { getUserByUsername } from './storage/local/userQueries'
import AuthStorage from './utils/authStorage'
import { useDispatch } from 'react-redux'
import { setLoggedInUser } from './redux/userSlice'

const useLogIn = () => {
    const db = useDatabase()
    const dispatch = useDispatch()
    const logIn = async (username: string, password: string) => {
        try {
            const user = (await getUserByUsername(db, username))[0]

            if (user && user.password === password) {
                const authStorage = new AuthStorage()
                await authStorage.setUser(user)
                dispatch(setLoggedInUser(user))
                return true
            }
            return false
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    return logIn
}

export default useLogIn
