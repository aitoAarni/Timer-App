import { StyleSheet, View } from 'react-native'
import Text from './Text'

import { useEffect, useState } from 'react'
import { getUsers } from '@/storage/local/userQueries'
import {
    getAllTimeData,
    getAllTimes,
    insertTime,
} from '@/storage/local/timerQueries'
import { TimeDuratio, TimeLogged } from '@/types'
import { useDatabase } from '@/contexts/DatabaseContext'
import { formatTotalTime } from '@/utils/format'
import HeatMapGraph from './HeatMapGraph'
import AreaChartView from './AreaChartView'

export default function StatisticsView() {
    const [data, setData] = useState<string>('00:00')
    const db = useDatabase()
    useEffect(() => {
        const getData = async () => {
            try {
                const times_array = await getAllTimes(db)
                const times = times_array.reduce((a, b) => a + b.duration, 0)
                console.log('times: ', times)
                setData(formatTotalTime(times))
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        getData()
    }, [])
    console.log(data)
    return (
        <View>
            <Text>statimtiks</Text>
            <Text>{data}</Text>
            <AreaChartView />
        </View>
    )
}

const styles = StyleSheet.create({ container: { flexGrow: 1 } })
