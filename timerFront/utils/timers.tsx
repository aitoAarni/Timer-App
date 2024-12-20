class CountdownTimer {
    timeLength: number
    paused: boolean
    timerStart: number
    previousTime: number
    constructor(length: number) {
        this.timeLength = length
        this.paused = true
        this.timerStart = 0
        this.previousTime = 0
    }

    #getEpoch() {
        const date = new Date()
        const epoch = Math.floor(date.getTime() / 100)
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
        return this.timeLength - Math.floor(displayTime / 10)
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
        console.log('2')
        if (this.timerActive) {
            this.activeTimer.pauseToggle()
            console.log('3 ', this.activeTimer.paused)
        } else {
            this.breakTimer.pauseToggle()
        }
    }

    timerLogic() {
        if (this.timerActive) {
            const timeRemaining = this.activeTimer.getTime()
            if (timeRemaining === 0) {
                this.timerActive = !this.timerActive
                this.activeTimer.resetTimer()
            }
            return timeRemaining
        } else {
            const timeRemaining = this.breakTimer.getTime()
            if (timeRemaining === 0) {
                this.timerActive = !this.timerActive
                this.breakTimer.resetTimer()
            }
            return timeRemaining
        }
    }

    getFormattedTime() {
        const time = this.timerLogic()
    }
}
