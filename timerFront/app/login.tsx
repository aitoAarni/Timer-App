import LogInView from '@/components/LogInView'
import SignInView from '@/components/SignUpView'
import useLoggedIn from '@/hooks/useLoggedIn'
import theme from '@/theme'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Text from '@/components/Text'

export default function LoginPage() {
    const [login, setLogin] = useState(true)
    const loggedIn = useLoggedIn()
    if (loggedIn) {
        return <Text> You are already logged in</Text>
    }
    return (
        <View style={styles.container}>
            {login ? (
                <LogInView setLogin={setLogin} />
            ) : (
                <SignInView setLogin={setLogin} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    loggedInTxt: { fontSize: 30, color: theme.colors.text, marginTop: 20 },
})
