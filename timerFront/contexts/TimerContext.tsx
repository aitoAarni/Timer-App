import { createContext, ReactNode, useContext } from 'react'
import { SettingsContext } from './SettingsContext'
import { useDatabase } from './DatabaseContext'
import { getUserId } from '@/services/user'
import TimeLogger from '@/utils/logger'
import Timer from '@/utils/timers'

const TimerContext = createContext<Timer | null>(null)

export const useTimer = () => {
    const context = useContext(TimerContext)
    if (!context) {
        throw new Error(`useTimer musb be used within TimerProvider`)
    }
    return context
}

export const TimerProvider = function ({ children }: { children: ReactNode }) {
    const context = useContext(SettingsContext)
    if (!context) {
        throw new Error('SettingsView must be used within a SettingsProvider')
    }
    const { settings } = context
    const { workTimeLength, breakTimeLength } = settings
    const database = useDatabase()
    const userId = getUserId()
    const logger = new TimeLogger(database, userId, 1)
    const timer = new Timer(workTimeLength * 60, breakTimeLength * 60, logger)
    return (
        <TimerContext.Provider value={timer}>{children}</TimerContext.Provider>
    )
}
