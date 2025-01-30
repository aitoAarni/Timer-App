import { View, StyleSheet, Pressable, Dimensions } from 'react-native'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { Link, LinkProps, usePathname } from 'expo-router'
import Text from './Text'
import theme from '@/theme'

// TODO: optimize how long it takes from clicking link to showing page

const screenWidth = Dimensions.get('window').width
export default function AppBar({
    navigation,
    options,
    back,
    route,
}: NativeStackHeaderProps) {
    const pathname = usePathname()
    return (
        <View style={styles.container}>
            <AppBarButton
                href="/settings"
                text="Settings"
                currentPath={pathname}
            />
            <AppBarButton href="/" text="Timer" currentPath={pathname} />
            <AppBarButton
                href="/statistics"
                text="Statistics"
                currentPath={pathname}
            />
        </View>
    )
}

const AppBarButton = function ({
    href,
    text,
    currentPath,
}: {
    href: LinkProps['href']
    text: string
    currentPath: string
}) {
    return (
        <View
            style={[
                styles.textContainer,
                currentPath === href ? styles.activeLink : null,
            ]}
        >
            <Link href={href} asChild>
                <Pressable>
                    <Text
                        style={[
                            styles.text,
                            currentPath === href ? styles.acitveText : null,
                        ]}
                    >
                        {text}
                    </Text>
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
        paddingHorizontal: 10,
    },
    textContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    acitveText: { color: theme.colors.text },
    activeLink: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    text: { fontSize: 20, color: theme.colors.grayLight },
})
