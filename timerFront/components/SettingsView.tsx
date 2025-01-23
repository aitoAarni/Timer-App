import {
    ScrollView,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native'
import Text from './Text'
import theme from '@/theme'
import Slider from '@react-native-community/slider'
import { useContext, useState } from 'react'
import { Settings } from '@/types'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setSettings } from '@/services/settings'
import { useDispatch } from 'react-redux'
import { updateSettings } from '@/features/settingsSlice'

export default function SettingsView() {
    const settings = useSelector((state: RootState) => state.settings)
    console.log(settings)
    return (
        <ScrollView style={styles.container}>
            <TimerSlider
                settingsKey="workTimeLength"
                style={{ marginBottom: 30 }}
                text="Work duration"
            />
            <TimerSlider settingsKey="breakTimeLength" text="Break duration" />
        </ScrollView>
    )
}

interface TimerSliderProps {
    style?: StyleProp<ViewStyle>
    text?: string
    settingsKey: keyof Settings
}

const TimerSlider = function ({ style, text, settingsKey }: TimerSliderProps) {
    const settings = useSelector((state: RootState) => state.settings)
    const dispatch = useDispatch()
    const [sliderValue, setSliderValue] = useState(0)
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
    container: { flexGrow: 1, marginTop: 40 },

    timerSliderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    sliderContainer: {
        flexDirection: 'row',
    },

    slider: { width: 300 },
})
