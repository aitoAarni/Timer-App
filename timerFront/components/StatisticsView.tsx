import { Button, StyleSheet, View } from 'react-native'
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
import AreaChartView from './AreaChartView'
const data1 = [
    { value: 15, dataPointText: '15' },
    { value: 30, dataPointText: '30' },
    { value: 26, endFillColor: '#535353' },
    { value: 40, endFillColor: '#528353' },
    { value: 5, endFillColor: '#537233' },
    { value: 25, endFillColor: '#526353' },
    { value: 27, endFillColor: '#535246' },
    { value: 65, endFillColor: '#525264' },
    { value: 25 },
    { value: 17 },
    { value: 13 },
    { value: 15 },
    { value: 25 },
    { value: 6 },
    { value: 35 },
    { value: 2 },
]
const data2 = [
    { value: 20, dataPointText: '20' },
    { value: 10, dataPointText: '10' },
    { value: 6 },
    { value: 15 },
    { value: 15 },
    { value: 15 },
    { value: 15 },
    { value: 15 },
    { value: 15 },
    { value: 15 },
]

export default function StatisticsView() {
    const [data, setData] = useState<string>('00:00')
    const [values, setValues] = useState(data1)
    const [original, setOriginal] = useState(true)
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
    const onPress = () => {
        const helper = original ? data1 : data2
        setOriginal(!original)
        setValues(helper)
    }
    return (
        <View>
            <Text>statimtiks</Text>
            <Text>{data}</Text>
            <AreaChartView data={values} />
            <Button title="switch data" onPress={onPress}></Button>
        </View>
    )
}

const styles = StyleSheet.create({ container: { flexGrow: 1 } })
