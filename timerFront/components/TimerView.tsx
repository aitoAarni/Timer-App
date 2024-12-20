import Timer from '@/utils/timers'
import { useEffect, useRef, useState } from 'react'
import { Button, Text, View } from 'react-native'

interface Props {
    time?: number
    breakTime?: number
}

export default function TimerView({ time, breakTime }: Props) {
    const [timerTime, setTimerTime] = useState(0)

    const timerRef = useRef(new Timer(20, 5))
    useEffect(() => {
        const interval = setInterval(() => {
            const t = timerRef.current.timerLogic()
            if (timerTime != t) {
                setTimerTime(t)
            }
        }, 250)

        return () => clearInterval(interval)
    }, [])

    const handleButtonClick = function () {
        console.log(timerRef.current.timerLogic())
    }
    const handleTogglePause = function () {
        console.log('1')
        timerRef.current.pauseToggle()
    }

    return (
        <View>
            <Button title="Time" onPress={handleButtonClick}></Button>
            <Text>Timer: {timerTime}</Text>
            <Button title="Toggle Pause" onPress={handleTogglePause}></Button>
        </View>
    )
}
