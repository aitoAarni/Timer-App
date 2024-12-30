import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [loaded, error] = useFonts({
        'PermanentMarker-Regular': require('@/assets/fonts/PermanentMarker-Regular.ttf'),
        'IBM-Plex-Mono': require('@/assets/fonts/IBMPlexMono-Bold.ttf'),
        PlaywriterFont: require('@/assets/fonts/PlaywriteFont.ttf'),
        'SpaceMono-Regular': require('@/assets/fonts/SpaceMono-Regular.ttf'),
        'DancingScript': require('@/assets/fonts/DancingScript-VariableFont_wght.ttf'),
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
            <Stack>
                <Stack.Screen options={{ headerShown: false }} name="index" />
                <Stack.Screen name="settings" />
            </Stack>
        </GestureHandlerRootView>
    )
}
