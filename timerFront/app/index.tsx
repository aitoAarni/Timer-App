import { Link } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import TimerView from '@/components/TimerView'
import theme from '@/theme'
import { useContext } from 'react'
import { SettingsContext } from '@/contexts/SettingsContext'
export default function HomePage() {
    const context = useContext(SettingsContext)
    if (!context) {
        throw new Error('SettingsView must be used within a SettingsProvider')
    }
    const { workTime, breakTime } = context
    return (
        <View style={styles.container}>
            <TimerView time={workTime * 60} breakTime={breakTime * 60} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        flexGrow: 1,
    },
})
