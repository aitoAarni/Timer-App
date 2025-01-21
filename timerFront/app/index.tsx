import { Link } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import TimerView from '@/components/TimerView'
import theme from '@/theme'
import { Dispatch, SetStateAction, useContext } from 'react'
import { SettingsContext } from '@/contexts/SettingsContext'
import { Settings } from '@/types'

interface SettingsContextType {
    settings: Settings
    setSettings: Dispatch<SetStateAction<Settings | null>>
}
export default function HomePage() {
    const context = useContext(SettingsContext)
    if (!context) {
        throw new Error('SettingsView must be used within a SettingsProvider')
    }

    const { settings } = context

    const { workTimeLength, breakTimeLength } = settings
    return (
        <View style={styles.container}>
            <TimerView
                time={workTimeLength * 60}
                breakTime={breakTimeLength * 60}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        flexGrow: 1,
    },
})
