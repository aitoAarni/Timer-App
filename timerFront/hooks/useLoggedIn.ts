import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

export default function useLoggedIn() {
    const user = useSelector((state: RootState) => state.user.loggedInUser)
    return user !== null
}
