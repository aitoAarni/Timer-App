import { StyleSheet, View } from 'react-native'
import Text from './Text'
import { DisplayTimeLogs } from '@/types'
import { useCallback, useState } from 'react'
import { getDateNdaysAgo } from '@/utils/utils'
import { formatTotalTime } from '@/utils/format'
import { getAllLocalTimeLogs } from '@/services/timeLogServices'
import { useFocusEffect } from 'expo-router'

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

    useFocusEffect(
        useCallback(() => {
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
    )
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>All time</Text>

                <Text style={styles.text}>
                    {formatTotalTime(weekTotal, false)}
                </Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Past 7 days</Text>
                <Text style={styles.text}>
                    {formatTotalTime(weekTotal, false)}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flexDirection: 'row', justifyContent: 'space-evenly' },
    textContainer: {},
    text: { fontSize: 18 },
})
