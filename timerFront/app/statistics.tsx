import StatisticsView from '@/components/StatisticsView'
import { View } from 'react-native'
import { StyleSheet } from 'react-native'
import theme from '@/theme'

export default function StatisticsPage() {
    return (
        <View style={styles.container}>
            <StatisticsView />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        flexGrow: 1,
    },
})
