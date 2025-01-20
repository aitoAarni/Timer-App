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

export default function SettingsView() {
    // const { setWorkTime, setBreakTime }
    const context = useContext(SettingsContext)
    if (!context) {
        throw new Error('SettingsView must be used within a SettingsProvider')
    }
    const { setWorkTime, setBreakTime } = context
    
    return (
        <ScrollView style={styles.container}>
            <TimerSlider
                callback={setWorkTime}
                style={{ marginBottom: 30 }}
                text="Work duration"
            />
            <TimerSlider callback={setBreakTime} text="Break duration" />
        </ScrollView>
    )
}

interface TimerSliderProps {
    style?: StyleProp<ViewStyle>
    text?: string
    callback?: (value: number) => void
}

const TimerSlider = function ({ style, text }: TimerSliderProps) {
    const [timer, setTime] = useState(10)
    const onValueChange = (value: number) => {
        setTime(value)
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
