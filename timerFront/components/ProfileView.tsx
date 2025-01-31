import { useSelector } from 'react-redux'
import SwipeNavigation from './SwipeNavigation'
import Text from './Text'
import { RootState } from '@/redux/store'
import theme from '@/theme'

export default function ProfileView() {
    const user = useSelector((state: RootState) => state.user.loggedInUser)
    if (!user) {
        return (
            <Text color={theme.colors.text} fontSize={25}>
                You must be logged in to see user profile
            </Text>
        )
    }
    return (
        <SwipeNavigation>
            <Text>profile view</Text>
        </SwipeNavigation>
    )
}
