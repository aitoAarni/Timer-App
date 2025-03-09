import { StyleSheet, Text, View } from 'react-native'
import { formatTotalTime } from './format'

export const DataPointLabel = ({ val }: { val: number }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{formatTotalTime(val, false)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flexGrow: 2 },
    text: {
        flex: 1,
        color: 'gray',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})
