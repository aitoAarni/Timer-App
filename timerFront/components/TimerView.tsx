import Timer from '@/utils/timers'
import { useEffect, useRef, useState } from 'react'
import { Button, Text, View } from 'react-native'

interface Props {
    time?: number
    breakTime?: number
}

export default function TimerView({ time = 5, breakTime = 3 }: Props) {
    const [timerTime, setTimerTime] = useState(time)

    const timerRef = useRef(new Timer(time, breakTime))
    useEffect(() => {
        const interval = setInterval(() => {
            const t = timerRef.current.timerLogic()
            console.log(`t1: ${t}`)
            console.log(`timerTime ${timerTime} != ${t} t : ${timerTime != t}`)
            if (timerTime != t) {
                console.log(`t2: ${t}`)
                setTimerTime(t)
            }
            console.log(`timerTime after: ${timerTime}`)
            console.log()
        }, 250)

        return () => clearInterval(interval)
    }, [])

    const handleButtonClick = function () {
        console.log(timerRef.current.timerLogic())
    }
    const handleTogglePause = function () {
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
