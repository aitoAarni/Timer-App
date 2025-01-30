import { StyleSheet, View } from 'react-native'
import TimerView from '@/components/TimerView'
import theme from '@/theme'
import { Stack, useLocalSearchParams } from 'expo-router'
import { StackAnimationTypes } from 'react-native-screens'

export default function HomePage() {
    const params = useLocalSearchParams()
    let animation: StackAnimationTypes = 'slide_from_bottom'
    if (!params?.from) {
    } else if (params.from === 'settings') {
        animation = 'slide_from_right'
    } else if (params.from === 'statistics') {
        animation = 'slide_from_left'
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ animation }} />
            <TimerView />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        flexGrow: 1,
    },
})
