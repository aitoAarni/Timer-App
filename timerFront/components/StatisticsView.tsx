import { StyleSheet, View } from 'react-native'
import Text from './Text'
import { useEffect, useState } from 'react'
import { getTimesGroupedByDate } from '@/storage/local/timerQueries'
import { useDatabase } from '@/contexts/DatabaseContext'
import AreaChartView from './AreaChartView'
import { transformDatesAndDurationDataForChart } from '@/utils/dataHandlers'
import { AreaChartData } from '@/types'

export default function StatisticsView() {
    const [data, setData] = useState<null | AreaChartData[]>(null)
    const [maxValue, setMaxValue] = useState(0)

    const db = useDatabase()
    useEffect(() => {
        const getData = async () => {
            try {
                const datesData = await getTimesGroupedByDate(db)
                const { transformedData, maxValue } =
                    transformDatesAndDurationDataForChart(datesData)
                setData(transformedData)
                setMaxValue(maxValue)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        getData()
    }, [])
    return (
        <View>
            <Text style={{marginBottom: 70}}>statimtiks</Text>
            {data ? (
                <AreaChartView data={data} maxValue={maxValue} />
            ) : (
                <Text>Loading data...</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({ container: { flexGrow: 1 } })
