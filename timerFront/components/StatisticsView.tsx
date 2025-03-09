import { ActivityIndicator, StyleSheet, View } from 'react-native'
import Text from './Text'
import { useCallback, useState } from 'react'
import AreaChartView from './AreaChartView'
import { transformDatesAndDurationDataForChart } from '@/utils/dataHandlers'
import { AreaChartData, DisplayTimeLogs } from '@/types'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import theme from '@/theme'
import SwipeNavigation from './SwipeNavigation'
import useNavigateTo from '@/hooks/useNavigateTo'
import LeaderBoard from './LeaderBoard'
import ErrorBox from './ErrorBox'
import { getLocalTimeLogs } from '@/services/timeLogServices'
import { useFocusEffect } from 'expo-router'
import StatisticsViewTotals from './StatisticsViewTotals'
import { getDateNdaysAgo } from '@/utils/utils'

export default function StatisticsView() {
    const [data, setData] = useState<null | DisplayTimeLogs>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const user = useSelector((state: RootState) => state.user.loggedInUser)
    const navigateLeft = useNavigateTo({
        pathname: '/',
        params: { from: 'statistics' },
    })

    useFocusEffect(
        useCallback(() => {
            const getData = async () => {
                if (!user) return
                try {
                    const monthAgo = getDateNdaysAgo(30)
                    const datesData = await getLocalTimeLogs(user.id, monthAgo)
                    setData(datesData)
                } catch (error) {
                    console.error('error in StatisticsView', error)
                    throw new Error(
                        `Error fetching data: ${
                            error instanceof Error
                                ? error.message
                                : String(error)
                        }`
                    )
                }
            }
            getData()
        }, [])
    )
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
            <ErrorBox
                setErrorMessage={setErrorMessage}
                errorMessage={errorMessage}
            />
            <StatisticsViewTotals />
            {data ? (
                <AreaChartView data={data} />
            ) : (
                <ActivityIndicator
                    style={styles.acitivityIndicator}
                    size="large"
                />
            )}
            <LeaderBoard
                userId={user.server_id}
                setErrorMessage={setErrorMessage}
            />
            <SwipeNavigation leftSwipeCallback={navigateLeft}></SwipeNavigation>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    notLoggedIn: { fontSize: 30, marginTop: 20, color: theme.colors.text },

    acitivityIndicator: { top: '30%' },
})
