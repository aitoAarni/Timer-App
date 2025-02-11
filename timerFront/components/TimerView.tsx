import { useCallback, useRef, useState } from 'react'
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
import useNavigateTo from '@/hooks/useNavigateTo'
import { useFocusEffect } from 'expo-router'

// TODO: when navigating between pages, fix animation to not show always from one side,
// and show white on the left of the screen
// TODO: when timer is swiped to right, then swipe navigation is off unitll timer is pressed again

export default function TimerView() {
    const timer = useRef(useTimer())
    const settings = useSelector((state: RootState) => state.settings)
    timer.current.setNextWorkTime(settings.workTimeLength * 60)
    timer.current.setNextBreakTime(settings.breakTimeLength * 60)
    const [time, setTime] = useState(timer.current.getSecondsRemaining())
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const navigateRight = useNavigateTo('/statistics')
    const navigateLeft = useNavigateTo('/settings')

    useFocusEffect(
        useCallback(() => {
            let previousTime = -2
            const interval = setInterval(() => {
                timer.current.updateTimer()

                const currentTime = timer.current.getSecondsRemaining()

                if (currentTime !== previousTime) {
                    previousTime = currentTime
                    setTime(currentTime)
                } else {
                }
            }, 200)
            return () => {
                return clearInterval(interval)
            }
        }, [])
    )
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
            <ErrorBox
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
            />
            <SwipeNavigation
                style={styles.fillerContainers}
                leftSwipeCallback={navigateLeft}
                rightSwipeCallback={navigateRight}
            ></SwipeNavigation>
            <View style={styles.timerContainer}>
                <View
                    style={styles.timerPressable}
                >
                    <DirectionPad
                        onUp={handleResetTimer}
                        onLeft={handleAddTime}
                        onRight={handleSwitchTimer}
                        onTap={handleTogglePause}
                    >
                        <Text testID="timer-text" style={styles.text}>
                            {formatTime(time)}
                        </Text>
                    </DirectionPad>
                </View>
            </View>
            <SwipeNavigation
                style={[styles.fillerContainers, styles.bottomContainer]}
                leftSwipeCallback={navigateLeft}
                rightSwipeCallback={navigateRight}
            ></SwipeNavigation>
            <ModalView />
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
    bottomContainer: {
        marginBottom: 50,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
})
