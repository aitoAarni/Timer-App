import Timer from '@/utils/timers'
import { useEffect, useRef, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Text from '../components/Text'
import DirectionPad from './DirectionPad'
import { formatTime } from '@/utils/format'
import TimeLogger from '@/utils/logger'
import { useDatabase } from '@/contexts/DatabaseContext'
import { getUserId } from '@/services/user'
import { configuration } from '@/config'

interface Props {
    time?: number
    breakTime?: number
}

export default function TimerView({ time = 20, breakTime = 5 }: Props) {
    console.log('confiiig: ', configuration())
    const [timerTime, setTimerTime] = useState(time)
    const database = useDatabase()
    const userId = getUserId()
    useEffect(() => {
        const interval = setInterval(() => {
            const t = timerRef.current.getSecondsRemaining()
            setTimerTime(t)
        }, 100)

        return () => clearInterval(interval)
    }, [])
    const loggerRef = useRef(new TimeLogger(database, userId, 1))
    const timerRef = useRef(new Timer(time, breakTime, loggerRef.current))

    const handleTogglePause = function () {
        timerRef.current.pauseToggle()
    }
    const handleResetTimer = function () {
        timerRef.current.resetTimer()
    }
    const handleAddTime = function () {
        timerRef.current.addTime(60)
    }
    const handleSwitchTimer = function () {
        timerRef.current.switchTimer()
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
                            {formatTime(timerTime)}
                        </Text>
                    </DirectionPad>
                </Pressable>
            </View>
            <View style={styles.fillerContainers}></View>
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
})
