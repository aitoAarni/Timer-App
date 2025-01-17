// @ts-nocheck
import TimeLogger from '@/utils/logger'
import Timer, { CountdownTimer } from '@/utils/timers'
import { toHaveStyle } from '@testing-library/react-native/build/matchers/to-have-style'
import { SQLiteDatabase } from 'expo-sqlite'

describe('timers.tsx file', () => {
    let timeSinceEpochMock: number = 100_000
    let addTimeLogMock
    let addMockTime = (ms: number) => {
        timeSinceEpochMock += ms
    }

    beforeEach(() => {
        jest.spyOn(Date.prototype, 'getTime').mockImplementation(() => {
            return timeSinceEpochMock
        })
    })
    afterAll(() => {
        jest.restoreAllMocks()
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })
    describe('CountdownTimer', () => {
        let countdownTimer: CountdownTimer
        beforeEach(() => {
            addTimeLogMock = jest.fn()
            timeLoggerMock = {
                db: jest.fn(),
                userId: 1,
                categoryId: 1,
                addTimeLog: addTimeLogMock,
            }
            countdownTimer = new CountdownTimer(5, timeLoggerMock)
        })
        it('gives starting time right when getTime() called', () => {
            expect(countdownTimer.getTime()).toBe(4)
        })
        it('activates timer when togglePause() is called', () => {
            countdownTimer.pauseToggle()
            addMockTime(2_000)
            expect(countdownTimer.getTime()).toBe(2)
        })
        it('shows correct time after pausing', () => {
            countdownTimer.pauseToggle()
            addMockTime(1_000)
            countdownTimer.pauseToggle()
            addMockTime(5_000)
            expect(countdownTimer.getTime()).toBe(3)
        })
        it('adds time when addTime() is called', () => {
            countdownTimer.addTime(10)
            expect(countdownTimer.getTime()).toBe(14)
        })
        it('resets timer when resetTimer() is called', () => {
            countdownTimer.pauseToggle()
            addMockTime(4_000)
            countdownTimer.addTime(15)
            countdownTimer.resetTimer()
            expect(countdownTimer.getTime()).toBe(4)
            expect(countdownTimer.paused).toBeTruthy()
        })
        it('logs time when resetTimer() is called', () => {
            countdownTimer.pauseToggle()
            addMockTime(4_000)
            countdownTimer.resetTimer()
            expect(addTimeLogMock).toHaveBeenCalledWith(4000)
        })
        it('logs time when pauseToggle() is called to pause the timer', () => {
            countdownTimer.pauseToggle()
            addMockTime(3_000)
            countdownTimer.pauseToggle()
            expect(addTimeLogMock).toHaveBeenCalledTimes(1)
            expect(addTimeLogMock).toHaveBeenCalledWith(3_000)
        })
    })
    describe('Timer', () => {
        let timer: Timer
        beforeEach(() => {
            addTimeLogMock = jest.fn()
            const timeLoggerMock = {
                addTimeLog: addTimeLogMock,
            }
            timer = new Timer(20, 5, timeLoggerMock)
        })

        it('shows correct time when initialized', () => {
            expect(timer.getSecondsRemaining()).toBe(19)
        })

        it("doesn't start timer automatically", () => {
            addMockTime(5000)
            expect(timer.getSecondsRemaining()).toBe(19)
        })

        it('shows correct time after 5 seconds', () => {
            timer.pauseToggle()
            addMockTime(5000)
            expect(timer.getSecondsRemaining()).toBe(14)
        })

        it('starts timer after pauseToggle', () => {
            timer.pauseToggle()
            addMockTime(5000)
            timer.pauseToggle()
            addMockTime(5000)
            expect(timer.getSecondsRemaining()).toBe(14)
        })

        it('swithces to break after active timer runs out', () => {
            timer.pauseToggle()
            addMockTime(20_001)
            expect(timer.getSecondsRemaining()).toBe(4)
            expect(timer.timerActive).toBeFalsy()
        })

        it('resets timer while in active state', () => {
            timer.pauseToggle()
            addMockTime(6000)
            timer.resetTimer()
            addMockTime(21_000)
            expect(timer.getSecondsRemaining()).toBe(19)
        })

        it('resets timer when resetTimer() while in break state', () => {
            timer.pauseToggle()
            addMockTime(21_000)
            timer.resetTimer()
            addMockTime(21_000)
            expect(timer.getSecondsRemaining()).toBe(19)
        })
        it('adds time when addTime() is called ', () => {
            timer.addTime(60)
            expect(timer.getSecondsRemaining()).toBe(79)
        })
        it('swithces timer mode from active to brake when switchTimer() called', () => {
            timer.pauseToggle()
            timer.switchTimer()
            expect(timer.getSecondsRemaining()).toBe(4)
            expect(timer.timerActive).toBeFalsy()
        })

        it('swithces timer mode from active to brake when switchTimer() called', () => {
            timer.pauseToggle()
            timer.switchTimer()
            timer.switchTimer()
            expect(timer.getSecondsRemaining()).toBe(19)
            expect(timer.timerActive).toBeTruthy()
        })
        it('logs correct time when timer reset and then paused', () => {
            timer.pauseToggle()
            addMockTime(1_000)
            timer.resetTimer()
            addMockTime(2_000)
            timer.pauseToggle()
            addMockTime(3_000)
            expect(addTimeLogMock).toHaveBeenCalledTimes(1)
            expect(addTimeLogMock).toHaveBeenCalledWith(1_000)
        })
        it('logs correct time if there is a break inbetween', () => {
            timer.pauseToggle()
            addMockTime(20_001)
            timer.getSecondsRemaining()
            expect(addTimeLogMock).toHaveBeenCalledWith(20_001)
            addMockTime(5_001)
            timer.getSecondsRemaining()
            addMockTime(10_000)
            timer.pauseToggle()
            expect(addTimeLogMock).toHaveBeenCalledTimes(2)
            expect(addTimeLogMock).toHaveBeenLastCalledWith(10_000)
        })
        it('logs correct time if timer skipped and then paused', () => {
            timer.pauseToggle()
            addMockTime(5_000)
            timer.switchTimer()
            expect(addTimeLogMock).toHaveBeenCalledWith(5_000)
            addMockTime(3_000)
            timer.switchTimer()
            addMockTime(6_000)
            timer.pauseToggle()
            expect(addTimeLogMock).toHaveBeenCalledTimes(2)
            expect(addTimeLogMock).toHaveBeenLastCalledWith(6_000)
        })
    })
})
