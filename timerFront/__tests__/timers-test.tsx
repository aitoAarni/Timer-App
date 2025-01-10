import Timer from '@/utils/timers'

describe('Timer', () => {
    let timer: Timer
    let timeSinceEpochMock: number = 100_000
    let addMockTime = (ms: number) => {
        timeSinceEpochMock += ms
    }
    beforeEach(() => {
        jest.spyOn(Date.prototype, 'getTime').mockImplementation(() => {
            return timeSinceEpochMock
        })

        timer = new Timer(20, 5)
    })

    afterEach(() => {
        jest.restoreAllMocks()
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

    it('resets timer while in break state', () => {
        timer.pauseToggle()
        addMockTime(21_000)
        timer.resetTimer()
        addMockTime(21_000)
        expect(timer.getSecondsRemaining()).toBe(19)
    })
    
})
