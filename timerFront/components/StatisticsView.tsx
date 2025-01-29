import { StyleSheet, View } from 'react-native'
import Text from './Text'
import { useEffect, useState } from 'react'
import { getTimesGroupedByDate } from '@/storage/local/timerQueries'
import { useDatabase } from '@/hooks/useDatabase'
import AreaChartView from './AreaChartView'
import {
    getPlaceholderDataForChart,
    transformDatesAndDurationDataForChart,
} from '@/utils/dataHandlers'
import { AreaChartData } from '@/types'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import theme from '@/theme'

export default function StatisticsView() {
    const [data, setData] = useState<null | AreaChartData[]>(null)
    const [maxValue, setMaxValue] = useState(0)
    const db = useDatabase()
    const user = useSelector((state: RootState) => state.user.loggedInUser)
    useEffect(() => {
        const getData = async () => {
            if (!user) return
            try {
                const {
                    transformedData: placeholderData,
                    maxValue: placeholderMaxValue,
                } = getPlaceholderDataForChart()
                setData(placeholderData)
                setMaxValue(placeholderMaxValue)
                const datesData = await getTimesGroupedByDate(db, user.id)
                const { transformedData, maxValue: maxVal } =
                    transformDatesAndDurationDataForChart(datesData)
                setData(transformedData)
                setMaxValue(maxVal)
            } catch (error) {
                console.log('error in StatisticsView', error)
                throw new Error(
                    `Error fetching data: ${
                        error instanceof Error ? error.message : String(error)
                    }`
                )
            }
        }
        getData()
    }, [])
    if (!user) {
        return (
            <Text style={styles.notLoggedIn}>
                You must be logged in to get statistics
            </Text>
        )
    }

    return (
        <View style={styles.container}>
            {data ? (
                <AreaChartView data={data} maxValue={maxValue} />
            ) : (
                <Text>Loading data...</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flexGrow: 1 },
    notLoggedIn: { fontSize: 30, marginTop: 20, color: theme.colors.text },
})
