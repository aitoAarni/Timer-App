import theme from '@/theme'
import { getLoadedFonts } from 'expo-font'
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

const Text = function ({ style, color, fontSize, ...props }: Props) {
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
        color: theme.colors.text,
        fontSize: theme.fontSizes.timer,
    },
})

export default Text
