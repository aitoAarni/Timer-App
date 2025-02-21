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
    accumulatedTime: Milliseconds
    timeLogger: TimeLogger | null
    /**
     * @param length - Timer length in seconds
     * @param timeLogger - Optional time logger
     */
    constructor(length: Seconds, timeLogger: TimeLogger | null = null) {
        this.timeLength = length - 1 // in seconds
        this.paused = true
        this.timerStart = 0
        this.accumulatedTime = 0 // in milliseconds
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
        checkPositiveNumber(time)
        this.timeLength = time - 1
    }

    pauseToggle() {
        this.paused = !this.paused
        if (this.paused) {
            const elapsedTime = this.#timeElapsed()
            this.#logTime(elapsedTime)
            this.accumulatedTime += elapsedTime
        } else {
            this.timerStart = this.#getEpoch()
        }
    }

    addTime(time: Seconds) {
        checkPositiveNumber(time)
        this.accumulatedTime -= time * 1000
    }

    resetTimer() {
        const timeElapsed = this.#timeElapsed()
        if (!this.paused) {
            this.#logTime(timeElapsed)
        }
        this.accumulatedTime = 0
        this.paused = true
    }

    getTime() {
        let displayTime
        if (this.paused) {
            displayTime = this.accumulatedTime
        } else {
            displayTime = this.#timeElapsed() + this.accumulatedTime
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
        checkPositiveNumber(time)
        if (this.timerActive) {
            this.workTimer.addTime(time)
        } else {
            this.breakTimer.addTime(time)
        }
    }

    setNextWorkTime(time: Seconds) {
        checkPositiveNumber(time)
        const oldWorkLength = this.workLength
        this.workLength = time
        if (
            this.workTimer.paused &&
            oldWorkLength - 1 === this.workTimer.getTime()
        ) {
            this.workTimer.setTimerLength(this.workLength)
        }
    }
    setNextBreakTime(time: Seconds) {
        checkPositiveNumber(time)
        const oldBreakLength = this.breakLength
        this.breakLength = time
        if (
            this.breakTimer.paused &&
            oldBreakLength - 1 === this.breakTimer.getTime()
        ) {
            this.breakTimer.setTimerLength(this.breakLength)
        }
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

const checkPositiveNumber = (value: number) => {
    if (!isPositiveNumber(value)) {
        throw new Error('time must be a positive number')
    }
}
