// @ts-nocheck
import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import LeaderBoard from '@/components/LeaderBoard'

const mockRankingData = {
    userRank: 5,
    userDuration: 60_000,
    totalParticipants: 100,
    nearbyUsers: [
        {
            rank: 4,
            user_id: 'abc123',
            username: 'Alice',
            duration: 120_000,
        },
        {
            rank: 5,
            user_id: 'testId',
            username: 'testUsername',
            duration: 60_000,
        },
        { rank: 6, user_id: 'xyz456', username: 'Bob', duration: 30_000 },
    ],
}

jest.mock('@expo/vector-icons/AntDesign', () => {
    return (props: React.ComponentProps<'svg'>) => {
        return <svg {...props} />
    }
})

let mockGetRankings: jest.Mock
jest.mock('@/services/rankingServices', () => ({
    getRankings: (...args) => {
        return mockGetRankings(...args)
    },
}))

let mockToRankings: jest.Mock
jest.mock('@/utils/validators', () => ({
    toRankings: (...args) => {
        return mockToRankings(...args)
    },
}))

jest.mock("expo-router", () => ({
    useFocusEffect: jest.fn(callback => callback())
}))

describe('LeaderBoard Component', () => {
    const mockSetErrorMessage = jest.fn()

    beforeEach(() => {
        mockGetRankings = jest.fn().mockResolvedValue(mockRankingData)
        mockToRankings = jest.fn().mockReturnValue(mockRankingData)
        jest.clearAllMocks()
    })

    it('renders correctly', () => {
        const { getByPlaceholderText } = render(
            <LeaderBoard
                userId="testId"
                setErrorMessage={mockSetErrorMessage}
            />
        )

        expect(getByPlaceholderText('YYYY')).toBeTruthy()
        expect(getByPlaceholderText('MM')).toBeTruthy()
        expect(getByPlaceholderText('DD')).toBeTruthy()
    })


    it('fetches rankings on mount', async () => {
        const { getByText } = render(
            <LeaderBoard
                userId="testId"
                setErrorMessage={mockSetErrorMessage}
            />
        )

        await waitFor(() => expect(mockGetRankings).toHaveBeenCalled())

        expect(getByText('Your rank (5/100) top 5%')).toBeTruthy()
        expect(getByText('testUsername')).toBeTruthy()
        expect(getByText('Bob')).toBeTruthy()
        expect(getByText('Alice')).toBeTruthy()
    })

    it('fetches and displays rankings with correct input', async () => {
        const mockRankingData2 = {
            userRank: 1,
            userDuration: 60_000,
            totalParticipants: 10,
            nearbyUsers: [
                {
                    rank: 1,
                    user_id: 'testId',
                    username: 'testUsername',
                    duration: 15_000,
                },
            ],
        }
        const { getByText, getByTestId, getByPlaceholderText, queryByText } =
            render(
                <LeaderBoard
                    userId="testId"
                    setErrorMessage={mockSetErrorMessage}
                />
            )
        mockGetRankings = jest.fn().mockResolvedValue(mockRankingData2)
        mockToRankings = jest.fn().mockReturnValue(mockRankingData2)
        fireEvent.changeText(getByPlaceholderText('YYYY'), '2025')
        fireEvent.changeText(getByPlaceholderText('MM'), '02')
        fireEvent.changeText(getByPlaceholderText('DD'), '25')
        fireEvent.press(getByTestId('submit-button'))
        await waitFor(() => {
            expect(getByText('15s')).toBeTruthy()
            expect(queryByText('Bob')).toBeNull()
            expect(queryByText('Alice')).toBeNull()
        })
    })

    it('displays error message when given an invalid date', async () => {
        const { getByPlaceholderText, getByTestId } = render(
            <LeaderBoard
                userId="testId"
                setErrorMessage={mockSetErrorMessage}
            />
        )

        fireEvent.changeText(getByPlaceholderText('YYYY'), '3000')
        fireEvent.press(getByTestId('submit-button'))

        await waitFor(() => {
            expect(mockSetErrorMessage).toHaveBeenCalledWith(
                'You set an invalid date'
            )
        })
    })
})
