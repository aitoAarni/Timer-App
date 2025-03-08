import { StyleSheet, View } from 'react-native'
import Text from './Text'

export default function StatisticsViewTotals() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>hjellooo</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flexDirection: 'row', backgroundColor: 'blue' },
    text: { fontSize: 20 },
})
