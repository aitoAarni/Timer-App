// @ts-nocheck
import TimeLogger from '@/utils/logger'
import Timer, { CountdownTimer } from '@/utils/timers'
import { SQLiteDatabase } from 'expo-sqlite'

describe('timers.tsx file', () => {
    let timeSinceEpochMock: number = 100_000
    let addMockTime = (ms: number) => {
        timeSinceEpochMock += ms
    }

    beforeEach(() => {
        jest.spyOn(Date.prototype, 'getTime').mockImplementation(() => {
            return timeSinceEpochMock
        })
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })
    describe('CountdownTimer', () => {
        let timeLoggerMock: jest.Mocked<TimeLogger>
        let countdownTimer: CountdownTimer
        beforeEach(() => {
            const dbMock: jest.Mocked<SQLiteDatabase> = {
                databasePath: 'mockPath',
                options: {},
                nativeDatabase: {},
                isInTransactionAsync: jest.fn(),
                closeAsync: jest.fn(),
                execAsync: jest.fn(),
                serializeAsync: jest.fn(),
                prepareAsync: jest.fn(),
                withTransactionAsync: jest.fn(),
                withExclusiveTransactionAsync: jest.fn(),
                getAllSync: jest.fn(),
            }
            timeLoggerMock = {
                db: dbMock,
                userId: 1,
                categoryId: 1,
                addTimeLog: jest.fn(),
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
            addMockTime(4)
            countdownTimer.addTime(15)
            countdownTimer.resetTimer()
            expect(countdownTimer.getTime()).toBe(4)
            expect(countdownTimer.paused).toBeTruthy()
        })
        it('logs time when resetTimer() is called', () => {
            countdownTimer.pauseToggle()
            addMockTime(4)
            countdownTimer.resetTimer()
            console.log(
                'timeLoggerMock.mock.calls: ',
                timeLoggerMock.addTimeLog.mock.calls
            )
        })
    })
    describe('Timer', () => {
        let timer: Timer
        beforeEach(() => {
            timer = new Timer(20, 5)
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
    })
})
