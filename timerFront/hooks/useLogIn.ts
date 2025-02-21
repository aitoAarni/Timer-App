import { getUserByUsername } from '@/storage/local/userQueries'
import AuthStorage from '@/utils/authStorage'
import { useDispatch } from 'react-redux'
import { setLoggedInUser } from '@/redux/userSlice'
import login from '@/services/loginServices'
import { RemoteUser } from '@/types'
import { createLocalUser, createRemoteUser } from '@/services/userServices'

const useLogIn = () => {
    const dispatch = useDispatch()
    const logIn = async (username: string, password: string) => {
        let remoteUser: RemoteUser | null = null
        let requestNotPossible: boolean
        try {
            remoteUser = await login(username, password)
            requestNotPossible = false
        } catch (error) {
            console.error(error)
            requestNotPossible = true
        }
        console.log(
            'remoteUser: ',
            remoteUser,
            '  requestNotPossible',
            requestNotPossible
        )
        try {
            let localUser = (await getUserByUsername(username))[0]
            if (localUser && localUser.password === password) {
                console.log('localUser && localUser.password === password')
                if (!requestNotPossible && !remoteUser) {
                    console.log('!requestNotPossible && !remoteUser')
                    const newUser = await createRemoteUser(username, password)
                    console.log('new user: ', newUser)
                    console.log('trying to log in again')
                    remoteUser = await login(username, password)
                    console.log('remoteUser now: ', remoteUser)
                }
                const storageUser = {
                    ...localUser,
                    token: remoteUser ? remoteUser.token : null,
                }
                const authStorage = new AuthStorage()
                await authStorage.setUser(storageUser)
                dispatch(setLoggedInUser(storageUser))
                return true
            } else if (remoteUser) {
                console.log('else if (remoteUser)')
                await createLocalUser(username, password, remoteUser.id)
                localUser = (await getUserByUsername(username))[0]
                const storageUser = {
                    ...localUser,
                    token: remoteUser ? remoteUser.token : null,
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
