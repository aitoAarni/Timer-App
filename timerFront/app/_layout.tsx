// import 'expo-dev-client'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import theme from '@/theme'
import AppBar from '@/components/AppBar'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { TimerProvider } from '@/contexts/TimerContext'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { createTables, initializeDatabase } from '@/storage/local/db'
import { getUsers } from '@/storage/local/userQueries'
import { insertUser } from '@/storage/local/userQueries'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [isInitializing, setIsInitializing] = useState(true)
    const [loaded, error] = useFonts({
        'PermanentMarker-Regular': require('@/assets/fonts/PermanentMarker-Regular.ttf'),
        'IBM-Plex-Mono': require('@/assets/fonts/IBMPlexMono-Bold.ttf'),
        PlaywriterFont: require('@/assets/fonts/PlaywriteFont.ttf'),
        'SpaceMono-Regular': require('@/assets/fonts/SpaceMono-Regular.ttf'),
        DancingScript: require('@/assets/fonts/DancingScript-VariableFont_wght.ttf'),
    })

    useEffect(() => {
        const initialize = async () => {
            await initializeDatabase()
            await createTables()
            const users = await getUsers()

            if (users.length === 0) {
                await insertUser('test_user', 'password', 1)
            }
            setIsInitializing(false)
        }
        initialize()
        if (loaded || error) {
            SplashScreen.hideAsync()
        }
    }, [])

    if (!loaded && !error) {
        return null
    }
    if (isInitializing) <ActivityIndicator />
    return (
        <GestureHandlerRootView>
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
