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
import { SettingsContext } from '@/contexts/SettingsContext'
import { Settings } from '@/types'

export default function SettingsView() {
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
    const context = useContext(SettingsContext)
    if (!context) {
        throw new Error('SettingsView must be used within a SettingsProvider')
    }
    const { settings, setSettings } = context
    const initialValue = settings[settingsKey] ?? 20
    const [timer, setTime] = useState(initialValue)
    const onValueChange = (value: number) => {
        setTime(value)
    }
    const onRelease = (value: number) => {
        setTime(value)
        if (settingsKey && settingsKey in settings) {
            const updatedSettings = { ...settings, [settingsKey]: value }
            setSettings(updatedSettings)
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
                    value={10}
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
