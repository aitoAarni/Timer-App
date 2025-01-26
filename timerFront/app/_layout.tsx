// import 'expo-dev-client'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import theme from '@/theme'
import { DatabaseProvider } from '@/contexts/DatabaseContext'
import AppBar from '@/components/AppBar'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { TimerProvider } from '@/contexts/TimerContext'
import { Provider } from 'react-redux'
import { store } from '@/store'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [loaded, error] = useFonts({
        'PermanentMarker-Regular': require('@/assets/fonts/PermanentMarker-Regular.ttf'),
        'IBM-Plex-Mono': require('@/assets/fonts/IBMPlexMono-Bold.ttf'),
        PlaywriterFont: require('@/assets/fonts/PlaywriteFont.ttf'),
        'SpaceMono-Regular': require('@/assets/fonts/SpaceMono-Regular.ttf'),
        DancingScript: require('@/assets/fonts/DancingScript-VariableFont_wght.ttf'),
    })
    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync()
        }
    }, [loaded, error])

    if (!loaded && !error) {
        return null
    }
    return (
        <GestureHandlerRootView>
            <SafeAreaView style={styles.container}>
                <DatabaseProvider>
                    <Provider store={store}>
                        <TimerProvider>
                            <StatusBar
                                backgroundColor={theme.colors.background}
                                style="light"
                            />
                            <Stack
                                screenOptions={{
                                    header: (props: NativeStackHeaderProps) => (
                                        <AppBar {...props} />
                                    ),
                                }}
                            >
                                <Stack.Screen name="index" />
                                <Stack.Screen name="settings" />
                                <Stack.Screen name="statistics" />
                                <Stack.Screen name="login" />
                            </Stack>
                        </TimerProvider>
                    </Provider>
                </DatabaseProvider>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        borderWidth: 1,
    },
})
