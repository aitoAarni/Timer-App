import { createContext, ReactNode, useContext, useRef } from 'react'
import { useDatabase } from './DatabaseContext'
import { getUserId } from '@/services/user'
import TimeLogger from '@/utils/logger'
import Timer from '@/utils/timers'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const TimerContext = createContext<Timer | null>(null)

export const useTimer = () => {
    const context = useContext(TimerContext)
    if (!context) {
        throw new Error(`useTimer must be used within TimerProvider`)
    }
    return context
}

export const TimerProvider = function ({ children }: { children: ReactNode }) {
    const settings = useSelector((state: RootState) => state.settings)
    const { workTimeLength, breakTimeLength } = settings
    const database = useDatabase()
    const userId = getUserId()
    const logger = useRef(new TimeLogger(database, userId, 1))
    const timer = useRef(
        new Timer(workTimeLength * 60, breakTimeLength * 60, logger.current)
    )
    return (
        <TimerContext.Provider value={timer.current}>
            {children}
        </TimerContext.Provider>
    )
}
