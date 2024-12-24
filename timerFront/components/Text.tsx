import theme from '@/theme'
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

const Text = function ({ color, style, ...props }: Props) {
    const textStyle: StyleProp<TextStyle>[] = [
        styles.text,
        style,
        color && { color },
    ]
    return <NativeText style={textStyle} {...props} />
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'PlaywriteFont',
        color: 'red',
        fontSize: theme.fontSizes.timer,
    },
})

export default Text
