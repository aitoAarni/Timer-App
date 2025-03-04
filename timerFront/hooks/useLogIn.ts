import { getUserByUsername } from '@/storage/local/userQueries'
import AuthStorage from '@/utils/authStorage'
import { useDispatch } from 'react-redux'
import { setLoggedInUser } from '@/redux/userSlice'
import login from '@/services/loginServices'
import { RemoteUser } from '@/types'
import {
    createLocalUser,
    createRemoteUser,
    getLocalUserByUsername,
    removeLocalUser,
} from '@/services/userServices'

const useLogIn = () => {
    const dispatch = useDispatch()
    const logIn = async (username: string, password: string) => {
        let remoteUser: RemoteUser | null = null
        let requestNotPossible: boolean
        try {
            remoteUser = await login(username, password)
            console.log('remote user: ', remoteUser)
            requestNotPossible = false
        } catch (error) {
            console.error(error)
            requestNotPossible = true
        }

        try {
            let localUser = await getLocalUserByUsername(username)

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
                localUser = await getLocalUserByUsername(username)
                console.log('local user: ', localUser)
                if (!localUser) {
                    return false
                }
                const storageUser = {
                    ...localUser,
                    token: remoteUser ? 'Bearer ' + remoteUser.token : null,
                }
                const authStorage = new AuthStorage()
                console.log('storageUser: ', storageUser)

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
