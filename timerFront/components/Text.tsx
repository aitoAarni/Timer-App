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
        fontFamily: 'IBM-Plex-Mono',
        color: theme.colors.text,
        fontSize: theme.fontSizes.timer,
        textAlign: 'center',
    },
})

export default Text
