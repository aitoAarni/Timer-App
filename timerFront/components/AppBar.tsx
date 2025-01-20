import { View, StyleSheet, Pressable, Dimensions } from 'react-native'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { Link, usePathname } from 'expo-router'
import Text from './Text'
import theme from '@/theme'
import { LinearGradient } from 'expo-linear-gradient'

const screenWidth = Dimensions.get('window').width
console.log(screenWidth)
export default function AppBar({
    navigation,
    options,
    back,
}: NativeStackHeaderProps) {
    console.log(navigation.getId())
    const pathname = usePathname()
    return (
        <LinearGradient
            style={styles.container}
            colors={[theme.colors.grayLight, theme.colors.background]}
        >
            <Link href="/settings" asChild>
                <Pressable
                    style={[
                        styles.textContainer,
                        pathname === 'settings' ? styles.activeLink : null,
                    ]}
                >
                    <Text
                        style={[
                            styles.text,
                            pathname === '/settings' ? styles.acitveText : null,
                        ]}
                    >
                        settings
                    </Text>
                </Pressable>
            </Link>
            <Link href="/" asChild>
                <Pressable
                    style={[
                        styles.textContainer,
                        pathname === '/' ? styles.activeLink : null,
                    ]}
                >
                    <Text
                        style={[
                            styles.text,
                            pathname === '/' ? styles.acitveText : null,
                        ]}
                    >
                        Timer
                    </Text>
                </Pressable>
            </Link>
            <Link href="/statistics" asChild>
                <Pressable
                    style={[
                        styles.textContainer,
                        pathname === '/statistics' ? styles.activeLink : null,
                    ]}
                >
                    <Text
                        style={[
                            styles.text,
                            pathname === '/statistics'
                                ? styles.acitveText
                                : null,
                        ]}
                    >
                        Statistics
                    </Text>
                </Pressable>
            </Link>
        </LinearGradient>
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
    acitveText: { color: 'white' },
    activeLink: { backgroundColor: 'blue' },
    text: { fontSize: 20, color: theme.colors.grayLight },
})
