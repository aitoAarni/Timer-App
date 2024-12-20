import CountdownTimer from '@/utils/timers'
import { useEffect, useRef, useState } from 'react'
import { Button, Text, View } from 'react-native'

interface Props {
    time?: number
    breakTime?: number
}

export default function TimerView({ time, breakTime }: Props) {
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
