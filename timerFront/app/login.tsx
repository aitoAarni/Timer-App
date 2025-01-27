import LogInView from '@/components/LogInView'
import SignInView from '@/components/SignUpView'
import theme from '@/theme'
import { StyleSheet, View } from 'react-native'

export default function LoginPage() {
    return (
        <View style={styles.container}>
            {/* <SignInView /> */}
            <LogInView />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
})
