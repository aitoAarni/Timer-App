import { View, StyleSheet, Pressable, Dimensions } from 'react-native'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { Link } from 'expo-router'
import Text from './Text'
import theme from '@/theme'

const screenWidth = Dimensions.get('window').width
console.log(screenWidth)
export default function AppBar({
    navigation,
    options,
    back,
}: NativeStackHeaderProps) {
    return (
        <View style={styles.container}>
            <Link href="/settings" asChild>
                <Pressable style={styles.textContainer}>
                    <Text style={styles.text}>settings</Text>
                </Pressable>
            </Link>
            <Link href="/" asChild>
                <Pressable style={styles.textContainer}>
                    <Text style={styles.text}>Timer</Text>
                </Pressable>
            </Link>
            <Link href="/statistics" asChild>
                <Pressable style={styles.textContainer}>
                    <Text style={styles.text}>Statistics</Text>
                </Pressable>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: 50,
        backgroundColor: theme.colors.background,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: { fontSize: 20, color: theme.colors.grayLight },
})
