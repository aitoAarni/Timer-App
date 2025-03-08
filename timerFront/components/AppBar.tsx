import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import {
    ExternalPathString,
    RelativePathString,
    usePathname,
    useRouter,
} from 'expo-router'
import Text from './Text'
import theme from '@/theme'


const screenWidth = Dimensions.get('window').width
export default function AppBar() {
    const pathname = usePathname()

    return (
        <View style={styles.container}>
            <AppBarButton
                path="/settings"
                text="Settings"
                currentPath={pathname}
            />
            <AppBarButton path="/" text="Timer" currentPath={pathname} />
            <AppBarButton
                path="/statistics"
                text="Statistics"
                currentPath={pathname}
            />
        </View>
    )
}

const AppBarButton = function ({
    path,
    text,
    currentPath,
}: {
    path:
        | RelativePathString
        | ExternalPathString
        | '/'
        | '/login'
        | '/settings'
        | '/statistics'
        | '/_sitemap'
        | '/+not-found'
    text: string
    currentPath: string
}) {
    const router = useRouter()
    const onPress = () => {
        const from = currentPath.replace('/', '')
        router.push({
            pathname: path,
            params: { from },
        })
    }
    return (
        <View style={styles.textContainer}>
            <TouchableOpacity
                onPressIn={onPress}
                style={styles.touchableOpacity}
            >
                <Text
                    style={[
                        styles.text,
                        currentPath === path ? styles.acitveText : null,
                    ]}
                >
                    {text}
                </Text>
            </TouchableOpacity>
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

    text: { fontSize: 20, color: theme.colors.grayLight },
    touchableOpacity: { width: '100%' },
})
