import SettingsView from '@/components/SettingsView'
import theme from '@/theme'
import { StyleSheet, View } from 'react-native'

export default function SettingsPage() {
    console.log('settinnngsss')
    return (
        <View style={styles.container}>
            <SettingsView />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        flexGrow: 1,
    },
})
