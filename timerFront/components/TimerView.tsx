import { useEffect, useRef, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Text from '../components/Text'
import DirectionPad from './DirectionPad'
import { formatTime } from '@/utils/format'
import { useTimer } from '@/contexts/TimerContext'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export default function TimerView() {
    const timer = useRef(useTimer())
    const { workTimeLength, breakTimeLength } = useSelector(
        (state: RootState) => state.settings
    )
    timer.current.setNextWorkTime(workTimeLength * 60)
    timer.current.setNextBreakTime(breakTimeLength * 60)
    const [time, setTime] = useState(timer.current.getSecondsRemaining())
    useEffect(() => {
        const interval = setInterval(() => {
            timer.current.updateTimer()
            const t = timer.current.getSecondsRemaining()
            setTime(t)
        }, 100)

        return () => clearInterval(interval)
    }, [])

    const handleTogglePause = function () {
        timer.current.pauseToggle()
    }
    const handleResetTimer = function () {
        timer.current.resetTimer()
    }
    const handleAddTime = function () {
        timer.current.addTime(60)
    }
    const handleSwitchTimer = function () {
        timer.current.switchTimer()
    }
    return (
        <View style={styles.container}>
            <View style={styles.fillerContainers}></View>
            <View style={styles.timerContainer}>
                <Pressable
                    style={styles.timerPressable}
                    onPress={handleTogglePause}
                >
                    <DirectionPad
                        onUp={handleResetTimer}
                        onLeft={handleAddTime}
                        onRight={handleSwitchTimer}
                    >
                        <Text testID="timer-text" style={styles.text}>
                            {formatTime(time)}
                        </Text>
                    </DirectionPad>
                </Pressable>
            </View>
            <View
                style={[styles.fillerContainers, { marginBottom: 50 }]}
            ></View>
        </View>
    )
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
    backGround: { flexGrow: 1 },
})
