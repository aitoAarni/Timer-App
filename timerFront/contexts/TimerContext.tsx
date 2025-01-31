import { createContext, ReactNode, useContext, useRef } from 'react'
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
        new Timer(workTimeLength * 60, breakTimeLength * 60, logger.current)
    )
    return (
        <TimerContext.Provider value={timer.current}>
            {children}
        </TimerContext.Provider>
    )
}
