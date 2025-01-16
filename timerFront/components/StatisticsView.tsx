import { Button, StyleSheet, View, Text } from 'react-native'

import { useEffect, useState } from 'react'
import {
    getAllTimes,
    getTimesGroupedByDate,
} from '@/storage/local/timerQueries'
import { useDatabase } from '@/contexts/DatabaseContext'
import { formatTotalTime } from '@/utils/format'
import AreaChartView from './AreaChartView'
import { msToHours, transformDatesAndDurationData } from '@/utils/dataHandlers'
import { AreaChartData, DatesWithDuration } from '@/types'

export default function StatisticsView() {
    const [data, setData] = useState<null | AreaChartData[]>(null)
    const [original, setOriginal] = useState(false)

    const db = useDatabase()
    useEffect(() => {
        const getData = async () => {
            try {
                const datesData = await getTimesGroupedByDate(db)
                const transformedData = transformDatesAndDurationData(datesData)
                setData(transformedData)
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        getData()
    }, [])
    return (
        <View>
            <Text>statimtiks</Text>
            {data ? (
                <AreaChartView data={data} />
            ) : (
                <Text>Loading data...</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({ container: { flexGrow: 1 } })
