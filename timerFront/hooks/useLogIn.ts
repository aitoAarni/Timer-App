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
            console.log(1)
            remoteUser = await login(username, password)
            console.log('remote userrrrssssrrs:', remoteUser)
            requestNotPossible = false
            console.log(2)
        } catch (error) {
            console.error(error)
            console.log(3)
            requestNotPossible = true
        }
        try {
            console.log(4)
            const users = await getUserByUsername(username)
            if (users.length === 0) {
                return false
            }
            let localUser = users[0]
            console.log('remoteUser: ', remoteUser)
            console.log(5)
            if (localUser && localUser.password === password) {
                console.log(6)
                console.log(`!requestNotPossible: ${!requestNotPossible}`)
                console.log(`!remoteUser: ${!remoteUser}`)
                if (!requestNotPossible && !remoteUser) {
                    console.log('creating remote useeererr')

                    await createRemoteUser(username, password)
                    console.log(7)
                    remoteUser = await login(username, password)
                }
                const storageUser = {
                    ...localUser,
                    token: remoteUser ? remoteUser.token : null,
                }
                const authStorage = new AuthStorage()

                await authStorage.setUser(storageUser)
                console.log('storage user: ', storageUser)
                dispatch(setLoggedInUser(storageUser))
                console.log(8)
                return true
            } else if (remoteUser) {
                console.log(9)
                await createLocalUser(username, password, remoteUser.id)
                console.log('abudabi')
                localUser = (await getUserByUsername(username))[0]
                const storageUser = {
                    ...localUser,
                    token: remoteUser ? 'Bearer ' + remoteUser.token : null,
                }
                console.log('storageUser: ', storageUser)
                console.log(10)
                const authStorage = new AuthStorage()
                await authStorage.setUser(storageUser)
                dispatch(setLoggedInUser(storageUser))
                console.log(11)
                return true
            }
            console.log(13)
            return false
        } catch (error) {
            console.log(14)
            console.error(error)
            throw error
        }
    }
    return logIn
}

export default useLogIn
