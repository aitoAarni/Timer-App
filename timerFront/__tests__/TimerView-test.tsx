import React from 'react'
import { render, screen } from '@testing-library/react-native'
import TimerView from '../components/TimerView'

jest.mock('@/utils/timers', () => {
    const mockTimer = jest.fn().mockImplementation(() => {
        return {
            pauseToggle: jest.fn(),
            resetTimer: jest.fn(),
            addTime: jest.fn(),
            switchTimer: jest.fn(),
            getSecondsRemaining: jest.fn().mockReturnValue(5),
        }
    })
    return mockTimer
})

jest.mock('@/hooks/useDatabase', () => {
    return {
        useDatabase: jest.fn(),
    }
})

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
