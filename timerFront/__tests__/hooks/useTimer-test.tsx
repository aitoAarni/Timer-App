// @ts-nocheck

import { renderHook } from '@testing-library/react-native'
import { TimerContext } from '@/contexts/TimerContext'
import { useTimer } from '@/hooks/useTimer'
import { ReactNode } from 'react'

jest.mock('@react-native-async-storage/async-storage', () => {
    return jest.fn()
})

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}))

describe('useTimer hook', () => {
    test('should return the Timer context when used inside TimerProvider', () => {
        const mockTimer = { start: jest.fn(), stop: jest.fn() }

        const wrapper = ({ children }: { children: ReactNode }) => (
            <TimerContext.Provider value={mockTimer}>
                {children}
            </TimerContext.Provider>
        )

        const { result } = renderHook(() => useTimer(), { wrapper })

        expect(result.current).toBe(mockTimer)
    })

    test('should throw an error when used outside TimerProvider', () => {
        expect(() => {
            renderHook(() => useTimer())
        }).toThrow('useTimer must be used within TimerProvider')
    })
})
