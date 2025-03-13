import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import theme from '@/theme'
import AppBar from '@/components/AppBar'
import { TimerProvider } from '@/contexts/TimerContext'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import initializeStorage from '@/storage/local/initializeStorage'
import { ping } from '@/services/pingService'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [isInitializing, setIsInitializing] = useState(true)
    const [loaded, error] = useFonts({
        'IBM-Plex-Mono': require('@/assets/fonts/IBMPlexMono-Bold.ttf'),
    })
    useEffect(() => {
        const initialize = async () => {
            await ping()
            initializeStorage().then(() => {
                setIsInitializing(false)
            })
        }
        initialize()
    }, [])

    if (!isInitializing && (loaded || error)) {
        SplashScreen.hide()
    }
    if (isInitializing) return <View></View>
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <Provider store={store}>
                    <TimerProvider>
                        <StatusBar
                            backgroundColor={theme.colors.background}
                            style="light"
                        />
                        <AppBar />
                        <Stack
                            screenOptions={{
                                headerShown: false,
                                animation: 'none',
                                gestureEnabled: true,
                                gestureDirection: 'horizontal',
                            }}
                        >
                            <Stack.Screen
                                options={{ animation: 'slide_from_bottom' }}
                                name="profile"
                            />
                            <Stack.Screen
                                options={{ animation: 'slide_from_left' }}
                                name="settings"
                            />
                            <Stack.Screen
                                options={{ animation: 'slide_from_right' }}
                                name="statistics"
                            />
                            <Stack.Screen
                                options={{ animation: 'slide_from_bottom' }}
                                name="login"
                            />
                        </Stack>
                    </TimerProvider>
                </Provider>
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
