import ProfileView from '@/components/ProfileView'
import theme from '@/theme'
import { StyleSheet, View } from 'react-native'

export default function Profile() {
    return (
        <View style={styles.container}>
            <ProfileView />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
})
