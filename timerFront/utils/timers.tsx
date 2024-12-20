export default class CountdownTimer {
    timeLength: number
    breakLength: number
    paused: boolean
    timerStart: number
    previousTime: number
    constructor(length: number, pause: number) {
        this.timeLength = length
        this.breakLength = pause
        this.paused = true
        this.timerStart = 0
        this.previousTime = 0
    }

    getEpoch() {
        const date = new Date()
        const epoch = Math.floor(date.getTime() / 100)
        return epoch
    }

    #timeElapsed() {
        const currentTime = this.getEpoch()
        return currentTime - this.timerStart
    }

    togglePause() {
        this.paused = !this.paused
        if (this.paused) {
            const elapsedTime = this.#timeElapsed()
            this.previousTime += elapsedTime
        } else {
            this.timerStart = this.getEpoch()
        }
    }
    getTime() {
        let displayTime
        if (this.paused) {
            displayTime = this.previousTime
        } else {
            displayTime = this.#timeElapsed() + this.previousTime
        }
        return Math.floor(displayTime / 10)
    }
}
