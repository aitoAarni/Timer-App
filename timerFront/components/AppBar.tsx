import { View, StyleSheet, Button, StyleProp, ViewStyle } from 'react-native'

export default function AppBar({
    style,
    color,
}: {
    style?: StyleProp<ViewStyle>
    color?: 'string'
}) {
    return (
        <View
            style={[
                styles.container,
                style,
                color ? { backgroundColor: color } : null,
            ]}
        >
            <Button title="puuush"></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, height: 100, backgroundColor: 'red' },
})
