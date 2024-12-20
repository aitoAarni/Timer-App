import Timer from '@/utils/timers'
import { useEffect, useRef, useState } from 'react'
import { Button, Text, View } from 'react-native'

interface Props {
    time?: number
    breakTime?: number
}

export default function TimerView({ time = 20, breakTime = 5 }: Props) {
    const [timerTime, setTimerTime] = useState(time)

    const timerRef = useRef(new Timer(time, breakTime))
    useEffect(() => {
        const interval = setInterval(() => {
            const t = timerRef.current.getSecondsRemaining()
            setTimerTime(t)
        }, 100)

        return () => clearInterval(interval)
    }, [])

    const handleButtonClick = function () {
        console.log(timerRef.current.getSecondsRemaining())
    }
    const handleTogglePause = function () {
        timerRef.current.pauseToggle()
    }

    return (
        <View>
            <Button title="Time" onPress={handleButtonClick}></Button>
            <Text>Timer: {formatTime(timerTime)}</Text>
            <Button title="Toggle Pause" onPress={handleTogglePause}></Button>
        </View>
    )
}

const formatTime = function (seconds: number) {
    const formattedMinutes = String(Math.floor(seconds / 60)).padStart(2, '0')
    const formattedSeconds = String(Math.floor(seconds % 60)).padStart(2, '0')
    return formattedMinutes + ':' + formattedSeconds
}
