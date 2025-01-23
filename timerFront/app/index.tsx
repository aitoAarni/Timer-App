import { StyleSheet, View } from 'react-native'
import TimerView from '@/components/TimerView'
import theme from '@/theme'

export default function HomePage() {
    
    
    return (
        <View style={styles.container}>
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
