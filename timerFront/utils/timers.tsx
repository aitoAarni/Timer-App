import { isPositiveNumber } from '@/types'
import TimeLogger from './logger'

type Seconds = number
type Milliseconds = number

export class CountdownTimer {
    /** Timer length in seconds */
    timeLength: Seconds
    paused: boolean
    /** Start time in milliseconds */
    timerStart: Milliseconds
    /** Previous time in milliseconds */
    previousTime: Milliseconds
    timeLogger: TimeLogger | null
    /**
     * @param length - Timer length in seconds
     * @param timeLogger - Optional time logger
     */
    constructor(length: Seconds, timeLogger: TimeLogger | null = null) {
        console.log('length: ', length)
        this.timeLength = length - 1 // in seconds
        this.paused = true
        this.timerStart = 0
        this.previousTime = 0 // in milliseconds
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

    async #logTime(timeMs: Milliseconds) {
        if (this.timeLogger) {
            await this.timeLogger.addTimeLog(timeMs)
        }
    }

    setTimerLength(time: Seconds) {
        if (!isPositiveNumber(time)) {
            throw new Error('time must be a positive number')
        }
        this.timeLength = time - 1
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

    addTime(time: Seconds) {
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
    workLength: Seconds
    breakLength: Seconds
    /** true if timer is in work time, false if timer is in break time  */
    timerActive: boolean
    workTimer: CountdownTimer
    breakTimer: CountdownTimer
    /**
     * @param workLength - Work length in seconds
     * @param breakLength - Break length in seconds
     */
    constructor(
        workLength: Seconds,
        breakLength: Seconds,
        timeLogger: TimeLogger | null = null
    ) {
        this.workLength = workLength
        this.breakLength = breakLength
        this.timerActive = true
        this.workTimer = new CountdownTimer(workLength, timeLogger)
        this.breakTimer = new CountdownTimer(breakLength)
    }

    pauseToggle() {
        if (this.timerActive) {
            this.workTimer.pauseToggle()
        } else {
            this.breakTimer.pauseToggle()
        }
    }

    resetTimer() {
        this.timerActive = true
        const nextWorkLength = this.workLength
        const nextBreakLength = this.breakLength
        this.workTimer.setTimerLength(nextWorkLength)
        this.breakTimer.setTimerLength(nextBreakLength)
        this.workTimer.resetTimer()
        this.breakTimer.resetTimer()
    }

    addTime(time: Seconds) {
        if (!isPositiveNumber(time)) {
            throw new Error('Time must be a positive number')
        }
        if (this.timerActive) {
            this.workTimer.addTime(time)
        } else {
            this.breakTimer.addTime(time)
        }
    }

    setNextWorkTime(time: Seconds) {
        if (!isPositiveNumber(time)) {
            throw new Error('Time must be a positive number')
        }
        this.workLength = time
    }
    setNextBreakTime(time: Seconds) {
        if (!isPositiveNumber(time)) {
            throw new Error('Time must be a positive number')
        }
        this.breakLength = time
    }

    switchTimer() {
        if (this.timerActive) {
            this.timerActive = !this.timerActive
            this.workTimer.resetTimer()
            const nextBreakLength = this.breakLength
            this.breakTimer.setTimerLength(nextBreakLength)
            this.breakTimer.pauseToggle()
        } else {
            this.timerActive = !this.timerActive
            this.breakTimer.resetTimer()
            const nextWorkLength = this.workLength
            this.workTimer.setTimerLength(nextWorkLength)
            this.workTimer.pauseToggle()
        }
    }

    updateTimer() {
        if (this.timerActive) {
            let timeRemaining = this.workTimer.getTime()
            if (timeRemaining < 0) {
                this.switchTimer()
            }
        } else {
            let timeRemaining = this.breakTimer.getTime()
            if (timeRemaining < 0) {
                this.switchTimer()
            }
        }
    }

    getSecondsRemaining() {
        if (this.timerActive) {
            let timeRemaining = this.workTimer.getTime()
            return timeRemaining
        } else {
            let timeRemaining = this.breakTimer.getTime()
            return timeRemaining
        }
    }
}
