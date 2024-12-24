import theme from '@/theme'
import { useFonts } from 'expo-font'
import { getLoadedFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import {
    Text as NativeText,
    StyleProp,
    StyleSheet,
    TextProps,
    TextStyle,
} from 'react-native'

interface Props extends TextProps {
    color?: string
    fontSize?: number
    style?: StyleProp<TextStyle>
}

SplashScreen.preventAutoHideAsync()

const Text = function ({ style, color, fontSize, ...props }: Props) {
    const [loaded, error] = useFonts({
        'PermanentMarker-Regular': require('@/assets/fonts/PermanentMarker-Regular.ttf'),
    })
    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync()
        }
    }, [loaded, error])

    if (!loaded && !error) {
        return null
    }

    console.log('loaded fonts: ', getLoadedFonts())
    const textStyle: StyleProp<TextStyle>[] = [
        styles.text,
        style,
        color ? { color } : null,
        fontSize ? { fontSize } : null,
    ]
    return <NativeText style={textStyle} {...props} />
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'PermanentMarker-Regular',
        color: 'red',
        fontSize: theme.fontSizes.timer,
    },
})

export default Text
