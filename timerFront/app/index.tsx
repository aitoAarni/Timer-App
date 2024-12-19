import { Link } from 'expo-router'
import { View } from 'react-native'
import Timer from '@/components/timer'
export default function HomeView() {
    return (
        <View>
            <Timer />
            <Link href={'/settings'}>settings</Link>
        </View>
    )
}
