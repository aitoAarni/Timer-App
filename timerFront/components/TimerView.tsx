import { useEffect, useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Text from '../components/Text'
import DirectionPad from './DirectionPad'
import { formatTime } from '@/utils/format'
import { useTimer } from '@/hooks/useTimer'
import ErrorBox from './ErrorBox'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import ModalView from './modal/ModalView'
import SwipeNavigation from './SwipeNavigation'
import { useRouter } from 'expo-router'
import useNavigateTo from '@/hooks/useNavigateTo'

export default function TimerView() {
    const timer = useRef(useTimer())
    const settings = useSelector((state: RootState) => state.settings)
    timer.current.setNextWorkTime(settings.workTimeLength * 60)
    timer.current.setNextBreakTime(settings.breakTimeLength * 60)
    const [time, setTime] = useState(timer.current.getSecondsRemaining())
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const navigateRight = useNavigateTo('/statistics')
    const navigateLeft = useNavigateTo('/settings')

    useEffect(() => {
        setInterval(() => {
            timer.current.updateTimer()

            const t = timer.current.getSecondsRemaining()
            setTime(t)
        }, 100)
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
        <SwipeNavigation
            style={styles.container}
            leftSwipeCallback={navigateLeft}
            rightSwipeCallback={navigateRight}
        >
            <View style={styles.fillerContainers}>
                <ErrorBox
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                />
            </View>
            <View style={styles.timerContainer}>
                <TouchableOpacity
                    style={styles.timerPressable}
                    onPressIn={handleTogglePause}
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
                </TouchableOpacity>
            </View>
            <View
                style={[styles.fillerContainers, styles.bottomContainer]}
            ></View>
            <ModalView />
        </SwipeNavigation>
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
    bottomContainer: {
        marginBottom: 50,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
})
