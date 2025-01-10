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

    it('shows correct time after 5 seconds', () => {
        timer.pauseToggle()
        addMockTime(5000)
        expect(timer.getSecondsRemaining()).toBe(14)
    })
    
})
