import theme from '@/theme'
import Timer from '@/utils/timers'
import { useEffect, useRef, useState } from 'react'
import { Button, Pressable, StyleSheet, View } from 'react-native'
import Text from '../components/Text'
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated'

interface Props {
    time?: number
    breakTime?: number
}

export default function TimerView({ time = 20, breakTime = 5 }: Props) {
    const [timerTime, setTimerTime] = useState(time)
    const width = useSharedValue(100)
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
        <View style={styles.container}>
            <View style={styles.fillerContainers}>
                <Button
                    onPress={() => (width.value = (width.value + 10))}
                    title="lil xp"
                />
            </View>
            <View style={styles.timerContainer}>
                <Pressable
                    style={styles.timerPressable}
                    onPress={handleTogglePause}
                >
                    <Text style={styles.text}>{formatTime(timerTime)}</Text>
                </Pressable>
            </View>
            <View style={styles.fillerContainers}>
                <Animated.View style={[styles.animatedView, { width }]} />
            </View>
        </View>
    )
}

const formatTime = function (seconds: number) {
    const formattedMinutes = String(Math.floor(seconds / 60)).padStart(2, '0')
    const formattedSeconds = String(Math.floor(seconds % 60)).padStart(2, '0')
    return formattedMinutes + ':' + formattedSeconds
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, justifyContent: 'center' },
    timerContainer: {
        flexGrow: 1,
    },
    text: {
        textAlign: 'center',
    },
    fillerContainers: { flexGrow: 1 },
    timerPressable: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    animatedView: { width: 50, height: 50, backgroundColor: 'violet' },
})
