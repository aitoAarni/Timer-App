import { StyleSheet, View } from 'react-native'
import Text from './Text'
import { useEffect, useState } from 'react'
import { getTimesGroupedByDate } from '@/storage/local/timerQueries'
import { useDatabase } from '@/contexts/DatabaseContext'
import AreaChartView from './AreaChartView'
import {
    getPlaceholderDataForChart,
    transformDatesAndDurationDataForChart,
} from '@/utils/dataHandlers'
import { AreaChartData } from '@/types'

export default function StatisticsView() {
    const [data, setData] = useState<null | AreaChartData[]>(null)
    const [maxValue, setMaxValue] = useState(0)

    const db = useDatabase()
    useEffect(() => {
        const getData = async () => {
            try {
                const {
                    transformedData: placeholderData,
                    maxValue: placeholderMaxValue,
                } = getPlaceholderDataForChart()
                setData(placeholderData)
                setMaxValue(placeholderMaxValue)
                const datesData = await getTimesGroupedByDate(db)
                const { transformedData, maxValue: maxVal } =
                    transformDatesAndDurationDataForChart(datesData)
                setData(transformedData)
                setMaxValue(maxVal)
            } catch (error) {
                throw new Error(
                    `Error fetching data: ${
                        error instanceof Error ? error.message : String(error)
                    }`
                )
            }
        }
        getData()
    }, [])
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

const styles = StyleSheet.create({ container: { flexGrow: 1 } })
