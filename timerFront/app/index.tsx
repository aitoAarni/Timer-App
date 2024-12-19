import { Link } from 'expo-router'
import { Text, View } from 'react-native'

export default function HomeView() {
    return (
        <View>
            <Text>HOME SCREEN IS HERE</Text>
            <Link href={'/settings'}>settings</Link>
        </View>
    )
}
