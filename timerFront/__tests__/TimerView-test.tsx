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

jest.mock('@/contexts/DatabaseContext', () => {
    return {
        useDatabase: jest.fn(),
    }
})

describe('TimerView', () => {
    beforeEach(() => {
        render(<TimerView time={5} breakTime={3} />)
    })

    it('should render correctly', () => {
        screen.getByText('00:04')
    })
})
