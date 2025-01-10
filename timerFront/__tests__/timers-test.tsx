import Timer, { CountdownTimer } from '@/utils/timers'

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
        let countdownTimer: CountdownTimer
        beforeEach(() => {
            countdownTimer = new CountdownTimer(5)
        })
        it('gives starting time right when getTime() called', () => {
            expect(countdownTimer.getTime()).toBe(4)
        })
        it('activates timer when togglePause() is called', () => {
            countdownTimer.pauseToggle()
            addMockTime(2_000)
            expect(countdownTimer.getTime()).toBe(2)
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