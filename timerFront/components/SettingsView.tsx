import {
    ScrollView,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native'
import Text from './Text'
import theme from '@/theme'
import { useState } from 'react'
import { Settings } from '@/types'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { updateSettings } from '@/redux/settingsSlice'
import SwipeNavigation from './SwipeNavigation'
import useNavigateTo from '@/hooks/useNavigateTo'
import { useSharedValue } from 'react-native-reanimated'
import { Slider } from 'react-native-awesome-slider'
export default function SettingsView() {
    const navigateRight = useNavigateTo({
        pathname: '/',
        params: { from: 'settings' },
    })

    return (
        <SwipeNavigation
            style={styles.container}
            rightSwipeCallback={navigateRight}
        >
            <ScrollView style={styles.scrollView}>
                <TimerSlider
                    settingsKey="workTimeLength"
                    style={{ marginBottom: 30 }}
                    text="Work duration"
                />
                <TimerSlider
                    settingsKey="breakTimeLength"
                    text="Break duration"
                    minimumValue={1}
                    maximumValue={20}
                />
            </ScrollView>
        </SwipeNavigation>
    )
}

interface TimerSliderProps {
    style?: StyleProp<ViewStyle>
    text?: string
    settingsKey: keyof Settings
    minimumValue?: number
    maximumValue?: number
}

const TimerSlider = function ({
    style,
    text,
    settingsKey,
    minimumValue = 1,
    maximumValue = 100,
}: TimerSliderProps) {
    const settings = useSelector((state: RootState) => state.settings)
    const dispatch = useDispatch()
    const initialValue = settings[settingsKey] ?? 20
    const [timer, setTime] = useState(initialValue)
    const onValueChange = (value: number) => {
        console.log(value)
        const roundedValue = Math.round(value)
        setTime(roundedValue)
        progress.value = roundedValue
        console.log("progress", progress.value)
    }
    const onRelease = (value: number) => {
        const roundedValue = Math.round(value)

        setTime(roundedValue)
        if (settingsKey && settingsKey in settings) {
            dispatch(updateSettings({ [settingsKey]: roundedValue }))
        }
    }

    const progress = useSharedValue(initialValue)
    console.log(maximumValue)
    const min = useSharedValue(minimumValue)
    const max = useSharedValue(maximumValue)

    return (
        <View style={[styles.timerSliderContainer, style]}>
            <Text color={theme.colors.grayLight} fontSize={20}>
                {text}
            </Text>
            <View style={styles.sliderContainer}>
                <View style={{ flexGrow: 1 }}></View>

                <Slider
                    style={styles.container}
                    progress={progress}
                    minimumValue={min}
                    maximumValue={max}
                    onValueChange={onValueChange}
                    onSlidingComplete={onRelease}
                    sliderHeight={20}
                    
                    // steps={maximumValue - minimumValue}
                    // forceSnapToStep
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
