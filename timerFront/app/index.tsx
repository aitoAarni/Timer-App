import { Link } from 'expo-router'
import { View } from 'react-native'
import TimerView from '@/components/TimerView'
export default function HomeView() {
    return (
        <View>
            <TimerView />
            <Link href={'/settings'}>settings</Link>
        </View>
    )
}
