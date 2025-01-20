import { ScrollView, StyleSheet, View } from 'react-native'
import Text from './Text'
import theme from '@/theme'
import Slider from '@react-native-community/slider'

export default function SettingsView() {
    return (
        <ScrollView style={styles.container}>
            <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: { backgroundColor: theme.colors.background, flexGrow: 1 },
})
