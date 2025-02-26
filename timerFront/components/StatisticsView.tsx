import { ActivityIndicator, StyleSheet, View } from 'react-native'
import Text from './Text'
import { useEffect, useState } from 'react'
import { getTimesGroupedByDate } from '@/storage/local/timerQueries'
import AreaChartView from './AreaChartView'
import { transformDatesAndDurationDataForChart } from '@/utils/dataHandlers'
import { AreaChartData } from '@/types'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import theme from '@/theme'
import SwipeNavigation from './SwipeNavigation'
import useNavigateTo from '@/hooks/useNavigateTo'
import LeaderBoard from './LeaderBoard'

export default function StatisticsView() {
    const [data, setData] = useState<null | AreaChartData[]>(null)
    const [maxValue, setMaxValue] = useState(0)
    const user = useSelector((state: RootState) => state.user.loggedInUser)
    const navigateLeft = useNavigateTo({
        pathname: '/',
        params: { from: 'statistics' },
    })

    useEffect(() => {
        const getData = async () => {
            if (!user) return
            try {
                // TODO: increase perfomance
                // const {
                //     transformedData: placeholderData,
                //     maxValue: placeholderMaxValue,
                // } = getPlaceholderDataForChart()
                // setData(placeholderData)
                // setMaxValue(placeholderMaxValue)
                const datesData = await getTimesGroupedByDate(user.id)
                const { transformedData, maxValue: maxVal } =
                    transformDatesAndDurationDataForChart(datesData)
                setData(transformedData)
                setMaxValue(maxVal)
            } catch (error) {
                console.error('error in StatisticsView', error)
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
            <SwipeNavigation leftSwipeCallback={navigateLeft}>
                <Text style={styles.notLoggedIn}>
                    You must be logged in to get statistics
                </Text>
            </SwipeNavigation>
        )
    }

    return (
        <View style={styles.container}>
            {data ? (
                <AreaChartView data={data} maxValue={maxValue} />
            ) : (
                <ActivityIndicator
                    style={styles.acitivityIndicator}
                    size="large"
                />
            )}
            <LeaderBoard userId={user.server_id} />
            <SwipeNavigation leftSwipeCallback={navigateLeft}></SwipeNavigation>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    notLoggedIn: { fontSize: 30, marginTop: 20, color: theme.colors.text },

    acitivityIndicator: { top: '30%' },
})
