import { useDatabase } from './hooks/useDatabase'
import { getUserByUsername } from './storage/local/userQueries'
import AuthStorage from './utils/authStorage'

const useLogIn = () => {
    const db = useDatabase()
    const authStorage = new AuthStorage()
    const logIn = async (username: string, password: string) => {
        try {
            const user = (await getUserByUsername(db, username))[0]

            if (user.password === password) {
                await authStorage.setUser(user)
                return user
            }
            return null
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    return logIn
}

export default useLogIn
