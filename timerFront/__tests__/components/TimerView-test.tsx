import React from 'react'
import { render, screen } from '@testing-library/react-native'
import TimerView from '@/components/TimerView'

jest.mock('@/core/timers', () => {
    const mockTimer = jest.fn().mockImplementation(() => {
        return {
            pauseToggle: jest.fn(),
            resetTimer: jest.fn(),
            addTime: jest.fn(),
            switchTimer: jest.fn(),
            getSecondsRemaining: jest.fn().mockReturnValue(5),
            updateTimer: jest.fn(),
        }
    })
    return mockTimer
})

jest.mock('@expo/vector-icons/Feather', () => {
    return (props: React.ComponentProps<'svg'>) => {
        return <svg {...props} />
    }
})
jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(async key => null),
    setItem: jest.fn(async (key, value) => Promise.resolve()),
    removeItem: jest.fn(async key => Promise.resolve()),
}))

jest.mock('react-redux', () => ({
    useSelector: jest.fn().mockImplementation(() => {
        return {
            workTimeLength: jest.fn(() => 25),
            breakTimeLength: jest.fn(() => 10),
        }
    }),
}))


jest.mock('@/hooks/useTimer', () => {
    return {
        useTimer: jest.fn().mockImplementation(() => {
            return {
                getSecondsRemaining: jest.fn(() => 59),
                setNextWorkTime: jest.fn(value => {}),
                setNextBreakTime: jest.fn(value => {}),
            }
        }),
    }
})

jest.mock('expo-router', () => ({
    useFocusEffect: jest.fn(),
    useRouter: jest.fn(),
}))

jest.mock('react-redux', () => {
    return {
        useSelector: jest.fn(something => ({
            workTimeLength: 59,
            breakTimeLength: 12,
        })),
    }
})

describe('TimerView', () => {
    beforeEach(() => {
        render(<TimerView />)
    })

    it('should render correctly', () => {
        screen.getByText('00:59')
    })
})
