import { useEffect, useState } from 'react'
import { Button, Text, View } from 'react-native'

interface Props {
    time?: number
    breakTime?: number
}

export default function Timer({ time, breakTime }: Props) {
    const [timer, setTimer] = useState(0)
    const [paused, setPaused] = useState(true)
    const [startTime] = useState(getEpoch())

    let pausedTime = 0

    useEffect(() => {
        const interval = setInterval(() => {
            if (!paused) {
                const elapsed = timeElapsed(startTime)
                setTimer(elapsed)
            } else {
                const pausedStartTime = getEpoch()
            }
        }, 250)

        return () => clearInterval(interval)
    }, [])

    const handleButtonClick = function () {
        console.log(timeElapsed(startTime))
    }
    const handlePausePress = function () {
        setPaused(!paused)
    }

    return (
        <View>
            <Button title="Time" onPress={handleButtonClick}></Button>
            <Text>Timer: {timer}</Text>
        </View>
    )
}

function getEpoch() {
    const date = new Date()
    const epoch = Math.floor(date.getTime() / 100)
    return epoch
}

function timeElapsed(startTime: number) {
    const currentTime = getEpoch()
    return currentTime - startTime
}

class CountdownTimer {
    timeLength: number
    breakLength: number
    paused: boolean
    timerStart: number
    previousTime: number
    constructor(length: number, pause: number) {
        this.timeLength = length
        this.breakLength = pause
        this.paused = true
        this.timerStart = this.getEpoch()
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
        if (this.paused) {
            const elapsedTime = this.#timeElapsed()
            this.previousTime += elapsedTime
        } else {
            this.timerStart = this.getEpoch()
        }
        this.paused != this.paused
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
