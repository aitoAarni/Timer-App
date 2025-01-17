import { isPositiveNumber } from '@/types'
import TimeLogger from './logger'
export class CountdownTimer {
    timeLength: number
    paused: boolean
    timerStart: number
    previousTime: number
    timeLogger: TimeLogger | null
    constructor(length: number, timeLogger: TimeLogger | null = null) {
        this.timeLength = length - 1
        this.paused = true
        this.timerStart = 0
        this.previousTime = 0
        this.timeLogger = timeLogger
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

    async #logTime(timeMs: number) {
        if (this.timeLogger) {
            await this.timeLogger.addTimeLog(timeMs)
        }
    }

    pauseToggle() {
        this.paused = !this.paused
        if (this.paused) {
            const elapsedTime = this.#timeElapsed()
            this.#logTime(elapsedTime)
            this.previousTime += elapsedTime
        } else {
            this.timerStart = this.#getEpoch()
        }
    }

    addTime(time: number) {
        if (!isPositiveNumber(time)) {
            throw new Error('time must be a positive number')
        }
        this.previousTime -= time * 1000
    }

    resetTimer() {
        const timeElapsed = this.#timeElapsed()
        if (!this.paused) {
            this.#logTime(timeElapsed)
        }
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

        return this.timeLength - Math.floor(displayTime / 1000)
    }
}

export default class Timer {
    timerLength: number
    breakLength: number
    timerActive: boolean
    activeTimer: CountdownTimer
    breakTimer: CountdownTimer
    constructor(
        timerLength: number,
        breakLength: number,
        timeLogger: TimeLogger | null = null
    ) {
        this.timerLength = timerLength
        this.breakLength = breakLength
        this.timerActive = true
        this.activeTimer = new CountdownTimer(timerLength, timeLogger)
        this.breakTimer = new CountdownTimer(breakLength)
    }

    pauseToggle() {
        if (this.timerActive) {
            this.activeTimer.pauseToggle()
        } else {
            this.breakTimer.pauseToggle()
        }
    }

    resetTimer() {
        this.timerActive = true
        this.activeTimer.resetTimer()
        this.breakTimer.resetTimer()
    }

    addTime(time: number) {
        if (!isPositiveNumber(time)) {
            throw new Error('Time must be a positive number')
        }
        if (this.timerActive) {
            this.activeTimer.addTime(time)
        } else {
            this.breakTimer.addTime(time)
        }
    }

    switchTimer() {
        if (this.timerActive) {
            this.timerActive = !this.timerActive
            this.activeTimer.resetTimer()
            this.breakTimer.pauseToggle()
        } else {
            this.timerActive = !this.timerActive
            this.breakTimer.resetTimer()
            this.activeTimer.pauseToggle()
        }
    }

    getSecondsRemaining() {
        if (this.timerActive) {
            let timeRemaining = this.activeTimer.getTime()
            if (timeRemaining < 0) {
                this.switchTimer()
                timeRemaining = this.breakTimer.getTime()
            }
            return timeRemaining
        } else {
            let timeRemaining = this.breakTimer.getTime()
            if (timeRemaining < 0) {
                this.switchTimer()
                timeRemaining = this.activeTimer.getTime()
            }
            return timeRemaining
        }
    }
}
