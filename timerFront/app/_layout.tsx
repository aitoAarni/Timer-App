import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [loaded, error] = useFonts({
        'PermanentMarker-Regular': require('@/assets/fonts/PermanentMarker-Regular.ttf'),
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
        <Stack>
            <Stack.Screen options={{ headerShown: false }} name="index" />
            <Stack.Screen name="settings" />
        </Stack>
    )
}
