import { useEffect, useRef, useState } from 'react'
import { Button, Text, View } from 'react-native'

interface Props {
    time?: number
    breakTime?: number
}

export default function Timer({ time, breakTime }: Props) {
    const [timerTime, setTimerTime] = useState(0)

    const timerRef = useRef(new CountdownTimer(600, 10))
    useEffect(() => {
        const interval = setInterval(() => {
            if (timerTime != timerRef.current.getTime()) {
                setTimerTime(timerRef.current.getTime())
            }
        }, 250)

        return () => clearInterval(interval)
    }, [])

    const handleButtonClick = function () {
        console.log(timerRef.current.getTime())
    }
    const handleTogglePause = function () {
        timerRef.current.togglePause()
    }

    return (
        <View>
            <Button title="Time" onPress={handleButtonClick}></Button>
            <Text>Timer: {timerTime}</Text>
            <Button title="Toggle Pause" onPress={handleTogglePause}></Button>
        </View>
    )
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
