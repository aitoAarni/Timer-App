import {
    ScrollView,
    StyleProp,
    StyleSheet,
    TextInput,
    View,
    ViewStyle,
} from 'react-native'
import Text from './Text'
import theme from '@/theme'
import { useState } from 'react'
import { Settings } from '@/types'
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { updateSettings } from '@/redux/settingsSlice'
import SwipeNavigation from './SwipeNavigation'
import useNavigateTo from '@/hooks/useNavigateTo'
import { useSharedValue } from 'react-native-reanimated'
import { Slider } from 'react-native-awesome-slider'
import { setSettings } from '@/services/settings'
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
    const [timerValue, setTimerValue] = useState(String(initialValue))
    const onValueChange = (value: number) => {
        const roundedValue = Math.round(value)
        setTimerValue(String(roundedValue))
        progress.value = roundedValue
    }
    const onRelease = (value: number) => {
        const roundedValue = Math.round(value)

        setTimerValue(String(roundedValue))

        if (settingsKey && settingsKey in settings) {
            dispatch(updateSettings({ [settingsKey]: roundedValue }))
            const updatedSettings = {
                ...settings,
                [settingsKey]: String(roundedValue),
            }
            setSettings(updatedSettings)
        }
    }

    const onTextChange = (input: string) => {
        setTimerValue(input)
        if (!isNaN(Number(input))) {
            progress.value = Number(input)
        }
    }

    const onTextSubmit = () => {
        const timerValueNumber = Number(timerValue)
        if (!isNaN(timerValueNumber) && timerValueNumber > 0) {
            dispatch(updateSettings({ [settingsKey]: timerValueNumber }))
            const updatedSettings = {
                ...settings,
                [settingsKey]: timerValue,
            }
            setSettings(updatedSettings)
        } else {
            setTimerValue(String(progress.value))
        }
    }

    const onTextFocus = () => {
        setTimerValue('')
    }

    const progress = useSharedValue(initialValue)
    const min = useSharedValue(minimumValue)
    const max = useSharedValue(maximumValue)

    return (
        <View style={[styles.timerSliderContainer, style]}>
            <Text color={theme.colors.grayLight} fontSize={20}>
                {text}
            </Text>
            <View style={styles.sliderContainer}>
                <View style={{ flex: 1 }}></View>

                <Slider
                    testID="slider"
                    style={styles.slider}
                    bubbleContainerStyle={styles.invisible}
                    thumbWidth={0}
                    progress={progress}
                    minimumValue={min}
                    maximumValue={max}
                    onValueChange={onValueChange}
                    onSlidingComplete={onRelease}
                    sliderHeight={20}
                />

                <TextInput
                    testID={`text-input-${settingsKey}`}
                    style={styles.sliderTextInput}
                    value={String(timerValue)}
                    keyboardType="numeric"
                    onChangeText={onTextChange}
                    onBlur={onTextSubmit}
                    onFocus={onTextFocus}
                    returnKeyType="done"
                />
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
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    slider: { flex: 3 },
    sliderText: { flex: 1, textAlignVertical: 'top' },
    sliderTextInput: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        color: theme.colors.grayLight,
        borderColor: theme.colors.grayLight,
        paddingHorizontal: 10,
    },
    invisible: { opacity: 0 },
})
