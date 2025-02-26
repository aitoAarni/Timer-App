import { getUserByUsername } from '@/storage/local/userQueries'
import AuthStorage from '@/utils/authStorage'
import { useDispatch } from 'react-redux'
import { setLoggedInUser } from '@/redux/userSlice'
import login from '@/services/loginServices'
import { RemoteUser } from '@/types'
import {
    createLocalUser,
    createRemoteUser,
    removeLocalUser,
} from '@/services/userServices'

const useLogIn = () => {
    const dispatch = useDispatch()
    const logIn = async (username: string, password: string) => {
        let remoteUser: RemoteUser | null = null
        let requestNotPossible: boolean
        try {
            remoteUser = await login(username, password)
            console.log("remote user: ", remoteUser)
            requestNotPossible = false
        } catch (error) {
            console.error(error)
            requestNotPossible = true
        }
        try {
            const users = await getUserByUsername(username)
            
            let localUser = users.length > 0 ?  users[0] : null
            if (localUser && localUser?.password === password) {
                if (!requestNotPossible && !remoteUser) {
                    await createRemoteUser(username, password)
                    remoteUser = await login(username, password)
                }
                const storageUser = {
                    ...localUser,
                    token: remoteUser ? 'Bearer ' + remoteUser.token : null,
                }
                const authStorage = new AuthStorage()

                await authStorage.setUser(storageUser)
                dispatch(setLoggedInUser(storageUser))
                return true
            } else if (remoteUser) {
                await removeLocalUser(username)
                await createLocalUser(username, password, remoteUser.id)
                localUser = (await getUserByUsername(username))[0]
                const storageUser = {
                    ...localUser,
                    token: remoteUser ? 'Bearer ' + remoteUser.token : null,
                }
                const authStorage = new AuthStorage()
                await authStorage.setUser(storageUser)
                dispatch(setLoggedInUser(storageUser))
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
