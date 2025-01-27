import LogInView from '@/components/LogInView'
import SignInView from '@/components/SignUpView'
import theme from '@/theme'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

export default function LoginPage() {
    const [login, setLogin] = useState(true)
    return (
        <View style={styles.container}>
            {login ? <LogInView setLogin={setLogin} /> : <SignInView setLogin={setLogin} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
})
