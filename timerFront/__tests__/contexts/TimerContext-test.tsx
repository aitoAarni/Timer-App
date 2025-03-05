// @ts-nocheck
import { render, screen } from '@testing-library/react-native'
import { TimerProvider, TimerContext } from '@/contexts/TimerContext'
import Timer from '@/core/timers'

let mockStore = jest.fn()

jest.mock('react-redux', () => ({
    useSelector: () => {
        return mockStore()
    },
}))

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(async key => null),
    setItem: jest.fn(async (key, value) => Promise.resolve()),
    removeItem: jest.fn(async key => Promise.resolve()),
}))

describe('TimerProvider', () => {
    beforeEach(() => {
        mockStore.mockReturnValue({
            workTimeLength: 25,
            breakTimeLength: 5,
        })
    })

    test('should provide a Timer instance via context', () => {
        let timerFromContext: Timer | null = null

        const TestComponent = () => {
            const { View } = require('react-native')
            return (
                <TimerContext.Consumer>
                    {timer => {
                        timerFromContext = timer
                        return <View></View>
                    }}
                </TimerContext.Consumer>
            )
        }

        render(
            <TimerProvider>
                <TestComponent />
            </TimerProvider>
        )

        expect(timerFromContext).toBeInstanceOf(Timer)
        expect(timerFromContext?.workLength).toBe(25 * 60)
        expect(timerFromContext?.breakLength).toBe(5 * 60)
    })
})
