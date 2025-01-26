import { useEffect, useRef, useState } from 'react'
import { Button, Pressable, StyleSheet, View } from 'react-native'
import Text from '../components/Text'
import DirectionPad from './DirectionPad'
import { formatTime } from '@/utils/format'
import { useTimer } from '@/contexts/TimerContext'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import ErrorBox from './ErrorBox'
import { Link } from 'expo-router'

export default function TimerView() {
    const timer = useRef(useTimer())
    const [time, setTime] = useState(timer.current.getSecondsRemaining())
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

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
            <View style={styles.fillerContainers}>
                <ErrorBox
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                />
            </View>
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
            <View style={[styles.fillerContainers, { marginBottom: 50 }]}>
                <Link href="/login" style={{ color: 'white', fontSize: 20 }}>
                    To logiin
                </Link>
            </View>
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
    fillerContainers: { flex: 1 },
    timerPressable: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backGround: { flexGrow: 1 },
})
