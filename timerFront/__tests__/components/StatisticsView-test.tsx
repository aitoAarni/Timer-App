// @ts-nocheck
import {
    render,
    screen,
    fireEvent,
    waitFor,
} from '@testing-library/react-native'
import StatisticsView from '@/components/StatisticsView'
import { useSelector } from 'react-redux'
import { transformDatesAndDurationDataForChart } from '@/utils/dataHandlers'
import { act } from 'react-test-renderer'
import { Text } from 'react-native'
import { getLocalTimeLogs } from '@/services/timeLogServices'
import { NavigationContainer } from '@react-navigation/native'

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}))

jest.mock('@/hooks/useNavigateTo', () => () => jest.fn())

jest.mock('@/services/timeLogServices', () => ({
    getLocalTimeLogs: jest.fn(),
}))

jest.mock('@/utils/dataHandlers', () => ({
    transformDatesAndDurationDataForChart: jest.fn().mockReturnValue([], 0),
}))
jest.mock('@/components/AreaChartView', () => () => {
    const { View } = require('react-native')
    return <View testID="area-chart-view"></View>
})
jest.mock('@/components/LeaderBoard', () => () => {
    const { View } = require('react-native')
    return <View testID="leaderboard"></View>
})
jest.mock('@/components/ErrorBox', () => ({ errorMessage }) => {
    const { Text } = require('react-native')
    return errorMessage ? <Text>{errorMessage}</Text> : null
})
jest.mock('expo-router', () => ({
    useFocusEffect: jest.fn(),
    useRouter: jest.fn(),
}))

const mockUser = { id: 'user123', server_id: 'server123' }


describe('StatisticsView', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('renders login prompt if user is not logged in', () => {
        useSelector.mockReturnValue(null)
        render(
            <NavigationContainer>
                <StatisticsView />
            </NavigationContainer>
        )
        expect(
            screen.getByText('You must be logged in to get statistics')
        ).toBeTruthy()
    })

    it('renders components if user is logged in', async () => {
        const mockUser = {
            id: 1,
            username: 'testUser',
            password: 'correctPassword',
            server_id: 'serverid',
            created_at: '2025-02-28',
            token: 'Bearer token',
        }
        const mockData = [{ date: '2025-02-28', duration: 30 }]
        const mockTransformedData = { transformedData: mockData, maxValue: 100 }
        getLocalTimeLogs.mockResolvedValue(mockData)
        transformDatesAndDurationDataForChart.mockReturnValue(
            mockTransformedData
        )

        useSelector.mockReturnValue(mockUser)
        render(<StatisticsView />)
        await waitFor(() => {
            expect(screen.getByTestId('leaderboard')).toBeTruthy()
        })
    })
})
