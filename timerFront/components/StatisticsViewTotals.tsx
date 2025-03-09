import { StyleSheet, View } from 'react-native'
import Text from './Text'
import { DisplayTimeLogs } from '@/types'
import { useEffect, useState } from 'react'
import { getDateNdaysAgo } from '@/utils/utils'
import { formatTotalTime } from '@/utils/format'
import { getAllLocalTimeLogs } from '@/services/timeLogServices'

interface StatisticsViewTotalsProps {
    timeLogs: DisplayTimeLogs | null
    localUserId: number
}

export default function StatisticsViewTotals({
    timeLogs,
    localUserId,
}: StatisticsViewTotalsProps) {
    const [weekTotal, setWeekTotal] = useState(0)
    const [allTimeTotal, setAllTimeTotal] = useState(0)

    useEffect(() => {
        if (timeLogs) {
            console.log('timeLogs: ')
            getAllLocalTimeLogs(localUserId)
            const weekAgo = getDateNdaysAgo(7)
            const countWeekTotal = timeLogs.reduce((sum, timeLog) => {
                return timeLog.date > weekAgo
                    ? sum + timeLog.total_duration
                    : sum
            }, 0)
            setWeekTotal(countWeekTotal)

            timeLogs.forEach(log => {
                console.log(log)
            })
        }
    }, [timeLogs])
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                7 days: {formatTotalTime(weekTotal, false)}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flexDirection: 'row', backgroundColor: 'blue' },
    text: { fontSize: 20 },
})
