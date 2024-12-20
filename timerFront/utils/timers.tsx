class CountdownTimer {
    timeLength: number
    paused: boolean
    timerStart: number
    previousTime: number
    constructor(length: number) {
        this.timeLength = length - 1
        this.paused = true
        this.timerStart = 0
        this.previousTime = 0
    }

    #getEpoch() {
        const date = new Date()
        const epoch = date.getTime()
        return epoch
    }

    #timeElapsed() {
        const currentTime = this.#getEpoch()
        return currentTime - this.timerStart
    }

    pauseToggle() {
        this.paused = !this.paused
        if (this.paused) {
            const elapsedTime = this.#timeElapsed()
            this.previousTime += elapsedTime
        } else {
            this.timerStart = this.#getEpoch()
        }
    }

    resetTimer() {
        this.previousTime = 0
        this.paused = true
    }

    getTime() {
        let displayTime
        if (this.paused) {
            displayTime = this.previousTime
        } else {
            displayTime = this.#timeElapsed() + this.previousTime
        }
        const t = displayTime

        return this.timeLength - Math.floor(t / 1000)
    }
}

export default class Timer {
    timerLength: number
    breakLength: number
    timerActive: boolean // not a break
    activeTimer: CountdownTimer
    breakTimer: CountdownTimer
    constructor(timerLength: number, breakLength: number) {
        this.timerLength = timerLength
        this.breakLength = breakLength
        this.timerActive = true
        this.activeTimer = new CountdownTimer(timerLength)
        this.breakTimer = new CountdownTimer(breakLength)
    }

    pauseToggle() {
        if (this.timerActive) {
            this.activeTimer.pauseToggle()
        } else {
            this.breakTimer.pauseToggle()
        }
    }

    getSecondsRemaining() {
        if (this.timerActive) {
            let timeRemaining = this.activeTimer.getTime()
            if (timeRemaining < 0) {
                this.timerActive = !this.timerActive
                this.activeTimer.resetTimer()
                this.breakTimer.pauseToggle()
                timeRemaining = this.breakTimer.getTime()
            }
            return timeRemaining
        } else {
            let timeRemaining = this.breakTimer.getTime()
            if (timeRemaining < 0) {
                this.timerActive = !this.timerActive
                this.breakTimer.resetTimer()
                this.activeTimer.pauseToggle()
                timeRemaining = this.activeTimer.getTime()
            }
            return timeRemaining
        }
    }

}
