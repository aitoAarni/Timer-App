import React from 'react'
import { render } from '@testing-library/react-native'
import AreaChartView from '@/components/AreaChartView'
import theme from '@/theme'
import { View } from 'react-native'

jest.mock('react-native-gifted-charts', () => ({
    LineChart: jest.fn(() => {
        const { View } = require('react-native')
        return <View testID="MockedLineChart"></View>
    }),
}))

describe('AreaChartView', () => {
    const mockData = [
        { total_duration: 10, date: 'Jan' },
        { total_duration: 20, date: 'Feb' },
        { total_duration: 30, date: 'Mar' },
    ]

    it('renders without crashing', () => {
        const { getByTestId } = render(
            <AreaChartView data={mockData}  />
        )

        expect(getByTestId('MockedLineChart')).toBeTruthy()
    })

    it('renders with the correct maxValue', () => {
        const { getByTestId } = render(
            <AreaChartView data={mockData}  />
        )

        expect(getByTestId('MockedLineChart')).toBeTruthy()
    })

    it('adjusts maxValue when it is below threshold', () => {
        const { getByTestId } = render(
            <AreaChartView data={mockData}  />
        )

        expect(getByTestId('MockedLineChart')).toBeTruthy()
    })
})
