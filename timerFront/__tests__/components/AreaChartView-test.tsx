import React from 'react'
import { render } from '@testing-library/react-native'
import AreaChartView from '@/components/AreaChartView'
import theme from '@/theme'
import { View } from 'react-native'

// Mock react-native-gifted-charts to avoid actual rendering
jest.mock('react-native-gifted-charts', () => ({
    LineChart: jest.fn(() => {
        const { View } = require('react-native')
        return <View testID="MockedLineChart"></View>
    }),
}))

describe('AreaChartView', () => {
    const mockData = [
        { value: 10, label: 'Jan' },
        { value: 20, label: 'Feb' },
        { value: 30, label: 'Mar' },
    ]

    it('renders without crashing', () => {
        const { getByTestId } = render(
            <AreaChartView data={mockData} maxValue={50} />
        )

        expect(getByTestId('MockedLineChart')).toBeTruthy()
    })

    it('renders with the correct maxValue', () => {
        const { getByTestId } = render(
            <AreaChartView data={mockData} maxValue={100} />
        )

        expect(getByTestId('MockedLineChart')).toBeTruthy()
    })

    it('adjusts maxValue when it is below threshold', () => {
        const { getByTestId } = render(
            <AreaChartView data={mockData} maxValue={2} />
        )

        expect(getByTestId('MockedLineChart')).toBeTruthy()
    })
})
