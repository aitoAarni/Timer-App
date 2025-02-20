import { getUserByUsername } from '@/storage/local/userQueries'
import AuthStorage from '@/utils/authStorage'
import { useDispatch } from 'react-redux'
import { setLoggedInUser } from '@/redux/userSlice'
import login from '@/services/login'
import { RemoteUser } from '@/types'
import createLocalUser from '@/services/userServices'

const useLogIn = () => {
    const dispatch = useDispatch()
    const logIn = async (username: string, password: string) => {
        try {
            let remoteUser
            try {
                remoteUser = await login(username, password)
            } catch {
                remoteUser = null
            }

            const localUser = (await getUserByUsername(username))[0]

            if (localUser && localUser.password === password) {
                const authStorage = new AuthStorage()
                await authStorage.setUser(localUser)
                dispatch(setLoggedInUser(localUser))
                return true
            } else if (remoteUser) {
                await createLocalUser(username, undefined, remoteUser.id)
                const authStorage = new AuthStorage()
                await authStorage.setUser(localUser)
                dispatch(setLoggedInUser(localUser))
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

const addUserToLocalDatabse = (user: RemoteUser) => {}

export default useLogIn
