import {
    GestureResponderEvent,
    ScrollView,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native'
import Text from './Text'
import theme from '@/theme'
import Slider from '@react-native-community/slider'
import { useState } from 'react'
import { Settings } from '@/types'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { updateSettings } from '@/redux/settingsSlice'
import SwipeNavigation from './SwipeNavigation'
import useNavigateTo from '@/hooks/useNavigateTo'

export default function SettingsView() {
    const [swipeNavigationActive, setSwipeNavigationActive] = useState(true)
    const navigateRight = useNavigateTo('/')
    return (
        <SwipeNavigation
            style={styles.container}
            rightSwipeCallback={navigateRight}
            registerSwipe={swipeNavigationActive}
        >
            <ScrollView style={styles.scrollView}>
                <TimerSlider
                    setSwipeNavigationActive={setSwipeNavigationActive}
                    settingsKey="workTimeLength"
                    style={{ marginBottom: 30 }}
                    text="Work duration"
                />
                <TimerSlider
                    setSwipeNavigationActive={setSwipeNavigationActive}
                    settingsKey="breakTimeLength"
                    text="Break duration"
                />
            </ScrollView>
        </SwipeNavigation>
    )
}

interface TimerSliderProps {
    style?: StyleProp<ViewStyle>
    text?: string
    settingsKey: keyof Settings
    setSwipeNavigationActive: React.Dispatch<React.SetStateAction<boolean>>
}

const TimerSlider = function ({
    style,
    text,
    settingsKey,
    setSwipeNavigationActive,
}: TimerSliderProps) {
    const settings = useSelector((state: RootState) => state.settings)
    const dispatch = useDispatch()
    const initialValue = settings[settingsKey] ?? 20
    const [timer, setTime] = useState(initialValue)
    const onValueChange = (value: number) => {
        setTime(value)
    }
    const onRelease = (value: number) => {
        setTime(value)
        if (settingsKey && settingsKey in settings) {
            dispatch(updateSettings({ [settingsKey]: value }))
        }
    }

    return (
        <View style={[styles.timerSliderContainer, style]}>
            <Text color={theme.colors.grayLight} fontSize={20}>
                {text}
            </Text>
            <View style={styles.sliderContainer}>
                <View style={{ flexGrow: 1 }}></View>
                <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={100}
                    minimumTrackTintColor={theme.colors.text}
                    maximumTrackTintColor={theme.colors.grayLight}
                    thumbTintColor={theme.colors.text}
                    step={1}
                    value={initialValue}
                    onValueChange={value => onValueChange(value)}
                    onSlidingComplete={onRelease}
                    onTouchStart={(event: GestureResponderEvent) => {
                        setSwipeNavigationActive(false)
                    }}
                    onTouchEnd={(event: GestureResponderEvent) => {
                        setSwipeNavigationActive(true)
                    }}
                />
                <Text
                    style={{ flexGrow: 1 }}
                    color={theme.colors.grayLight}
                    fontSize={20}
                >
                    {timer}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { paddingTop: 30 },

    scrollView: { flexGrow: 1 },

    timerSliderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    sliderContainer: {
        flexDirection: 'row',
    },

    slider: { width: 300 },
})
