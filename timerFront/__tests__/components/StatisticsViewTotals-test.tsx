import React from 'react'
import { render, waitFor } from '@testing-library/react-native'
import StatisticsViewTotals from '@/components/StatisticsViewTotals'
import { getAllLocalTimeLogsLength } from '@/services/timeLogServices'
jest.mock('@/services/timeLogServices', () => ({
    getAllLocalTimeLogsLength: jest.fn(),
}))

jest.mock('@/utils/format', () => ({
    formatTotalTime: jest.fn(time => `${time}m`),
}))

jest.mock('expo-router', () => ({
    useFocusEffect: jest.fn(func => {
        return func()
    }),
}))

describe('StatisticsViewTotals', () => {
    const mockSetErrorMessage = jest.fn()
    const localUserId = 1

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders correctly with default values', () => {
        const { getByText, getAllByText } = render(
            <StatisticsViewTotals
                timeLogs={null}
                localUserId={localUserId}
                setErrorMessage={mockSetErrorMessage}
            />
        )

        expect(getByText('All time')).toBeTruthy()
        expect(getByText('Past 7 days')).toBeTruthy()
        expect(getAllByText('0m')).toHaveLength(2)
    })
})
