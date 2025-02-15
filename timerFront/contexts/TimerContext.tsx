import { createContext, ReactNode, useRef } from 'react'
import TimeLogger from '@/utils/logger'
import Timer from '@/utils/timers'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export const TimerContext = createContext<Timer | null>(null)

export const TimerProvider = function ({ children }: { children: ReactNode }) {
    const settings = useSelector((state: RootState) => state.settings)

    const { workTimeLength, breakTimeLength } = settings

    const logger = useRef(new TimeLogger(1))
    const timer = useRef(
        new Timer(
            Math.round(workTimeLength) * 60,
            Math.round(breakTimeLength) * 60,
            logger.current
        )
    )
    return (
        <TimerContext.Provider value={timer.current}>
            {children}
        </TimerContext.Provider>
    )
}
