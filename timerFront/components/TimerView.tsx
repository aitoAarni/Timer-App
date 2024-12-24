import theme from '@/theme'
import Timer from '@/utils/timers'
import { useEffect, useRef, useState } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import Text from '../components/Text'

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

    const handleTogglePause = function () {
        timerRef.current.pauseToggle()
    }

    return (
        <View style={styles.timerContainer}>
            <Text style={styles.text}>{formatTime(timerTime)}</Text>
            <Button title="Toggle Pause" onPress={handleTogglePause}></Button>
        </View>
    )
}

const formatTime = function (seconds: number) {
    const formattedMinutes = String(Math.floor(seconds / 60)).padStart(2, '0')
    const formattedSeconds = String(Math.floor(seconds % 60)).padStart(2, '0')
    return formattedMinutes + ':' + formattedSeconds
}

const styles = StyleSheet.create({
    timerContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
    },
})
