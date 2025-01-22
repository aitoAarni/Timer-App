import React from 'react'
import { render, screen } from '@testing-library/react-native'
import TimerView from '../components/TimerView'
import Timer from '@/utils/timers'

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

jest.mock('@/contexts/DatabaseContext', () => {
    return {
        useDatabase: jest.fn(),
    }
})

jest.mock('@/contexts/TimerContext', () => {
    return {
        useTimer: jest.fn().mockImplementation(() => {
            return { getSecondsRemaining: jest.fn(() => 59) }
        }),
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
