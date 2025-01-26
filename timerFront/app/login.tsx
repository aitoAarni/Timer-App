import ErrorBox from '@/components/ErrorBox'
import SignInView from '@/components/SignInView'
import theme from '@/theme'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

export default function LoginPage() {
    return (
        <View style={styles.container}>
            <SignInView />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
})
